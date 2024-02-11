<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResumeOptionsRequest;
use App\Http\Requests\ResumeProfileRequest;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Browsershot\Browsershot;

class ResumeController extends Controller
{
    /**
     * Update the user's resume profile information.
     */
    public function updateResumeProfile(ResumeProfileRequest $request)
    {
        if ($request->user()->resumeProfile) {
            $request->user()->resumeProfile->fill($request->validated());
        } else {
            $request->user()->resumeProfile()->create($request->validated())->save();
        }
        if ((int) $request->remove_cover_photo == 1) {
            $request->user()->resumeProfile->deleteCoverPhoto();
            $request->user()->resumeProfile->cover_photo = null;
        } elseif ($request->hasFile('file_cover_photo')) {
            $request->user()->resumeProfile->deleteCoverPhoto();
            $request->user()->resumeProfile->cover_photo = $request->file('file_cover_photo')->storePubliclyAs('users/'.$request->user()->id.'/cover-photo', date('U').'.'.$request->file('file_cover_photo')->clientExtension(), ['disk' => env('APP_DISK', 's3')]);
        }
        $request->user()->resumeProfile->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Update the user's resume options.
     */
    public function updateResumeOptions(ResumeOptionsRequest $request)
    {
        if ($request->user()->resumeOptions) {
            $request->user()->resumeOptions->fill($request->validated())->save();
        } else {
            $request->user()->resumeOptions()->create($request->validated())->save();
        }

        return Redirect::route('profile.edit');
    }

    /**
     * Preview the user's resume.
     */
    public function preview(): Response
    {
        $user = auth()->user() ? auth()->user() : User::find((int) request()->id);
        return Inertia::render('Resume/Layouts/'.$user->resumeOptions->layout, [
            'user' => $user->load('resumeProfile', 'resumeOptions'),
        ]);
    }

    /**
     * Print the user's resume to PDF.
     */
    public function print()
    {
        $browserShot = Browsershot::url('https://host.docker.internal:4430'.'/resume/preview?id='.auth()->id().'&chrome_key='.env('CHROMIUM_KEY'))
            ->setRemoteInstance(env('CHROMIUM_HOST', 'chromium'), env('CHROMIUM_PORT', '9222'))
            ->waitUntilNetworkIdle()
            ->format('A4')
            ->showBackground()
            ->noSandbox();

        header('Content-Type: application/pdf');
        header('Content-Disposition: inline; filename="'.auth()->user()->name.' Resume '.date('F Y').'.pdf"');
        echo $browserShot->pdf();
    }
}
