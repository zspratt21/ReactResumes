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
        if ($skill || ! $request->id) {
            if ($skill) {
                $skill->fill($values);
            } else {
                $skill = $request->user()->skills()->create($values);
            }
            if ((int) $request->remove_icon == 1 || $request->hasFile('file_icon')) {
                $skill->deleteIcon();
            }
            if ($request->hasFile('file_icon')) {
                $skill->icon = $request->file('file_icon')->storePubliclyAs('users/'.$request->user()->id.'/skills', date('U').'.'.$request->file('file_icon')->clientExtension());
            }
            $skill->save();
        }

        return Redirect::route('resume.edit');
    }

    public function prioritize(SkillPriorityRequest $request)
    {
        $skills = $request->user()->skills()->get()->keyBy('id');

        foreach ($request->priorities as $priority) {
            if (isset($skills[$priority['id']])) {
                $skills[$priority['id']]->priority = $priority['priority'];
            }
        }

        $request->user()->skills()->saveMany($skills->values());

        return Redirect::route('resume.edit');
    }

    public function delete(CrudDeleteRequest $request)
    {
        $delete = $request->user()->skills()->find($request->id)?->delete();
        if ($delete) {
            $skills = $request->user()->skills()->orderBy('priority')->get();
            foreach ($skills as $index => $skill) {
                $skill->priority = $index;
            }
            $request->user()->skills()->saveMany($skills);
        }

        return Redirect::route('resume.edit');
    }
}
