<?php

use App\Models\Milestone;

test('users can create a milestone', function () {
    $this->assertEquals(0, $this->experience->milestones()->count());
    $response = $this->actingAs($this->user)->patch(route('milestone.modify'), $this->example());
    $response->assertStatus(302);
    $response->assertRedirect(route('resume.edit'));
    $this->assertEquals(1, $this->experience->milestones()->count());
    $milestone = $this->experience->milestones()->first();
    $this->assertEquals('Milestone 1', $milestone->name);
    $this->assertEquals('I did something important.', $milestone->description);
    $this->assertEquals(0, $milestone->priority);
});

test('users can edit a milestone', function () {
    $milestone = Milestone::factory()->create(['experience_id' => $this->experience->id]);
    $data = $this->example(['id' => $milestone->id]);
    $response = $this->actingAs($this->user)->patch(route('milestone.modify'), $data);
    $response->assertStatus(302);
    $response->assertRedirect(route('resume.edit'));
    $this->assertEquals($data['name'], $milestone->fresh()->name);
    $this->assertEquals($data['description'], $milestone->fresh()->description);
});

test('users can prioritize milestones in an experience', function () {
    $milestone_1 = Milestone::factory()->create(['experience_id' => $this->experience->id]);
    $milestone_2 = Milestone::factory()->create(['experience_id' => $this->experience->id]);
    $milestone_3 = Milestone::factory()->create(['experience_id' => $this->experience->id]);
    $this->assertEquals(0, $milestone_1->priority);
    $this->assertEquals(1, $milestone_2->priority);
    $this->assertEquals(2, $milestone_3->priority);
    $response = $this->actingAs($this->user)->patch(route('milestones.prioritize'), [
        'experience_id' => $this->experience->id,
        'priorities' => [
            ['id' => $milestone_1->id, 'priority' => 2],
            ['id' => $milestone_2->id, 'priority' => 0],
            ['id' => $milestone_3->id, 'priority' => 1],
        ],
    ]);
    $response->assertStatus(302);
    $response->assertRedirect(route('resume.edit'));
    $this->assertEquals(2, $milestone_1->fresh()->priority);
    $this->assertEquals(0, $milestone_2->fresh()->priority);
    $this->assertEquals(1, $milestone_3->fresh()->priority);
});

test('users can delete a milestone', function () {
    $milestone = Milestone::factory()->create(['experience_id' => $this->experience->id]);
    $this->actingAs($this->user)->delete(route('milestone.delete'), ['id' => $milestone->id, 'experience_id' => $this->experience->id]);
    $this->assertNull($milestone->fresh());
    $this->assertEquals(0, $this->experience->milestones()->count());
});

test('milestones associated with a deleted experience are also deleted', function () {
    $milestone = Milestone::factory()->create(['experience_id' => $this->experience->id]);
    $this->actingAs($this->user)->delete(route('experience.delete'), ['id' => $this->experience->id]);
    $this->assertNull($milestone->fresh());
});
