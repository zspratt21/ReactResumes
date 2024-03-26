<?php

namespace App\Http\Controllers;

use App\Http\Requests\CrudDeleteRequest;
use App\Http\Requests\ExperienceRequest;
use Illuminate\Support\Facades\Redirect;

class ExperienceController extends Controller
{
    public function modify(ExperienceRequest $request)
    {
        $values = $request->validated();
        $experience = $request->user()->experiences()->find($request->id);
        if ($experience) {
            $experience->fill($values);
        } else {
            $experience = $request->user()->experiences()->create($values);
        }
        if ((int) $request->remove_image == 1) {
            $experience->deleteImage();
            $experience->image = null;
        } elseif ($request->hasFile('file_image')) {
            $experience->deleteImage();
            $experience->image = $request->file('file_image')->storePubliclyAs('users/'.$request->user()->id.'/experiences', date('U').'.'.$request->file('file_image')->clientExtension(), ['disk' => env('APP_DISK', 's3')]);
        }
        $experience->save();

        return Redirect::route('resume.edit');
    }

    public function delete(CrudDeleteRequest $request)
    {
        $experience = $request->user()->experiences()->find($request->id);
        if ($experience) {
            $experience->delete();
        }

        return Redirect::route('resume.edit');
    }
}
