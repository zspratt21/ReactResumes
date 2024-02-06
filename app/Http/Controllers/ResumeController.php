<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResumeOptionsRequest;
use App\Http\Requests\ResumeProfileRequest;
use Illuminate\Support\Facades\Redirect;

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
}
