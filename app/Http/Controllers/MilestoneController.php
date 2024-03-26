<?php

namespace App\Http\Controllers;

use App\Http\Requests\CrudDeleteMilestoneRequest;
use App\Http\Requests\MilestonePriorityRequest;
use App\Http\Requests\MilestoneRequest;
use Illuminate\Support\Facades\Redirect;

class MilestoneController extends Controller
{
    public function modify(MilestoneRequest $request)
    {
        $values = $request->validated();
        $experience = $request->user()->experiences()->find($request->experience_id);
        if ($experience) {
            $milestone = $experience->milestones()->find($request->id);
            if ($milestone) {
                $milestone->fill($values)->save();
            } else {
                $values['priority'] = $experience->milestones()->count();
                $experience->milestones()->create($values);
            }
        }

        return Redirect::route('resume.edit');
    }

    public function prioritize(MilestonePriorityRequest $request)
    {
        $experience = $request->user()->experiences()->find($request->experience_id);
        if ($experience) {
            foreach ($request->priorities as $priority) {
                $experience->milestones()->find($priority['id'])->update(['priority' => $priority['priority']]);
            }
        }

        return Redirect::route('resume.edit');
    }

    public function delete(CrudDeleteMilestoneRequest $request)
    {
        $experience = $request->user()->experiences()->find($request->experience_id);
        if ($experience) {
            $milestone = $experience->milestones()->find($request->id);
            if ($milestone) {
                $milestone->delete();
                foreach ($experience->milestones()->orderBy('priority')->get() as $index => $indexed_milestone) {
                    $indexed_milestone->update(['priority' => $index]);
                }
            }
        }

        return Redirect::route('resume.edit');
    }
}
