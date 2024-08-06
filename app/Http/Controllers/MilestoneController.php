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
            if ($milestone || ! $request->id) {
                if ($milestone) {
                    $milestone->fill($values)->save();
                } else {
                    $values['priority'] = $experience->milestones()->count();
                    $experience->milestones()->create($values);
                }
            }
        }

        return Redirect::route('resume.edit');
    }

    public function prioritize(MilestonePriorityRequest $request)
    {
        $experience = $request->user()->experiences()->find($request->experience_id);
        $milestones = $experience?->milestones()->get()->keyBy('id');
        if ($milestones) {
            foreach ($request->priorities as $priority) {
                if ($milestones[$priority['id']]) {
                    $milestones[$priority['id']]->priority = $priority['priority'];
                }
            }
            $experience->milestones()->saveMany($milestones->values());
        }

        return Redirect::route('resume.edit');
    }

    public function delete(CrudDeleteMilestoneRequest $request)
    {
        $experience = $request->user()->experiences()->find($request->experience_id);
        if ($experience) {
            $milestone = $experience->milestones()->find($request->id);
            if ($milestone) {
                $delete = $milestone->delete();
                if ($delete) {
                    $milestones = $experience->milestones()->orderBy('priority')->get();
                    foreach ($milestones as $index => $milestone) {
                        $milestone->priority = $index;
                    }
                    $experience->milestones()->saveMany($milestones);
                }
            }
        }

        return Redirect::route('resume.edit');
    }
}
