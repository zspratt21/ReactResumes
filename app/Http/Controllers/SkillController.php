<?php

namespace App\Http\Controllers;

use App\Http\Requests\CrudDeleteRequest;
use App\Http\Requests\SkillPriorityRequest;
use App\Http\Requests\SkillRequest;
use Illuminate\Support\Facades\Redirect;

class SkillController extends Controller
{
    public function modify(SkillRequest $request)
    {
        $values = $request->validated();
        $skill = $request->user()->skills()->find($request->id);
        if ($skill) {
            $skill->fill($values);
        } else {
            $values['priority'] = $request->user()->skills()->count();
            $skill = $request->user()->skills()->create($values);
        }
        if ((int) $request->remove_icon == 1) {
            $skill->deleteIcon();
            $skill->icon = null;
        } elseif ($request->hasFile('file_icon')) {
            $skill->deleteIcon();
            $skill->icon = $request->file('file_icon')->storePubliclyAs('users/'.$request->user()->id.'/skills', date('U').'.'.$request->file('file_icon')->clientExtension(), ['disk' => env('APP_DISK', 's3')]);
        }
        $skill->save();

        return Redirect::route('resume.edit');
    }

    public function updatePriorities(SkillPriorityRequest $request)
    {
        foreach ($request->priorities as $priority) {
            $request->user()->skills()->find($priority['id'])->update(['priority' => $priority['priority']]);
        }

        return Redirect::route('resume.edit');
    }

    public function delete(CrudDeleteRequest $request)
    {
        $request->user()->skills()->find($request->id)->delete();
        foreach ($request->user()->skills()->orderBy('priority')->get() as $index => $skill) {
            $skill->update(['priority' => $index]);
        }

        return Redirect::route('resume.edit');
    }
}
