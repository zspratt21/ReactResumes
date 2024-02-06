<?php

namespace App\Http\Controllers;

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
            $request->user()->resumeProfile->save();
        } else {
            $request->user()->resumeProfile()->create($request->validated());
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

    // @todo
    public function updateResumeOptions()
    {

    }
}
