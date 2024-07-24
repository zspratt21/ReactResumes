<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResumeOptionsRequest;
use App\Http\Requests\ResumeProfileRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Browsershot\Browsershot;

class ResumeController extends Controller
{
    protected function getResumeName(string $name): string
    {
        $date = date('F Y');
        return "{$name} Resume {$date}";
    }

    public function updateResumeProfile(ResumeProfileRequest $request): RedirectResponse
    {
        if ($request->user()->resumeProfile) {
            $resume_profile = $request->user()->resumeProfile->fill($request->validated());
        } else {
            $resume_profile = $request->user()->resumeProfile()->create($request->validated());
        }
        if ((int) $request->remove_cover_photo == 1) {
            $resume_profile->deleteCoverPhoto();
            $resume_profile->cover_photo = null;
        } elseif ($request->hasFile('file_cover_photo')) {
            $resume_profile->deleteCoverPhoto();
            $resume_profile->cover_photo = $request->file('file_cover_photo')->storePubliclyAs('users/'.$request->user()->id.'/cover-photo', date('U').'.'.$request->file('file_cover_photo')->clientExtension());
        }
        $resume_profile->save();

        return Redirect::route('resume.edit');
    }

    public function updateResumeOptions(ResumeOptionsRequest $request): RedirectResponse
    {
        if ($request->user()->resumeOptions) {
            $request->user()->resumeOptions->fill($request->validated())->save();
        } else {
            $request->user()->resumeOptions()->create($request->validated())->save();
        }

        return Redirect::route('resume.edit');
    }

    public function edit(): Response
    {
        return Inertia::render('Resume/Edit', [
            'auth.user' => auth()->user()->load('resumeProfile', 'resumeOptions', 'skills', 'experiences.milestones'),
            'mustVerifyEmail' => auth()->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function preview(): Response
    {
        $user = auth()->user() ? auth()->user() : User::find((int) request()->id);
        $layout = $user->resumeOptions->layout ?? 'Modern';

        return Inertia::render("Print/Resume/Layouts/{$layout}", [
            'user' => $user->load('resumeProfile', 'resumeOptions', 'skills', 'experiences.milestones'),
            'customTitle' => $this->getResumeName($user->name),
        ]);
    }

    public function print(): \Illuminate\Http\Response
    {
        $id = auth()->id();
        $key = config('print.chrome_key');
        $print_url = config('print.url');
        $browserShot = Browsershot::url("{$print_url}/resume/preview?id={$id}&chrome_key={$key}")
            ->setRemoteInstance(config('print.chrome_host'), config('print.chrome_port'))
            ->waitUntilNetworkIdle()
            ->format('A4')
            ->showBackground()
            ->noSandbox()
            ->windowSize(1920, 1080);

        return response($browserShot->pdf())
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', "inline; filename=\"{$this->getResumeName(auth()->user()->name)}.pdf\"");
    }
}
