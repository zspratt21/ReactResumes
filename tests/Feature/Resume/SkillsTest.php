<?php

use App\Models\Skill;
use App\Models\User;
use Illuminate\Http\UploadedFile;

test('users cannot interact with other users skills', function () {
    $other_user = User::factory()->create();
    $skill = Skill::factory()->create(['user_id' => $other_user->id]);
    $response_modify = $this->actingAs($this->user)->patch(route('skill.modify'), [
        'id' => $skill->id,
        'name' => 'Laravel',
        'url' => 'https://laravel.com/',
        'user_id' => $this->user->id,
    ]);
    $response_modify->assertStatus(302);
    $this->assertEquals(0, $this->user->skills()->count());
    $this->assertEquals($skill->id, $skill->fresh()->id);
    $this->assertEquals($skill->name, $skill->fresh()->name);
    $this->assertEquals($skill->url, $skill->fresh()->url);
    $this->assertEquals($other_user->id, $skill->fresh()->user_id);
    $response_delete = $this->actingAs($this->user)->delete(route('skill.delete'), ['id' => $skill->id]);
    $response_delete->assertStatus(302);
    $this->assertNotNull($skill->fresh());
});

test('users can create a skill', function () {
    $this->assertEquals(0, $this->user->skills()->count());
    $icon_file = UploadedFile::fake()->image('Laravel logo.png');
    $response = $this->actingAs($this->user)->patch(route('skill.modify'), [
        'name' => 'Laravel',
        'url' => 'https://laravel.com/',
        'file_icon' => $icon_file,
    ]);
    $this->assertNotNull($this->user->skills()->first()->icon);
    $response->assertStatus(302);
    $response->assertRedirect(route('resume.edit'));
    $this->assertEquals(1, $this->user->skills()->count());
});

test('users can edit a skill', function () {
    $skill = Skill::factory()->create(['user_id' => $this->user->id]);
    $this->assertNotNull($skill->icon);
    $response = $this->actingAs($this->user)->patch(route('skill.modify'), [
        'id' => $skill->id,
        'name' => 'Laravel',
        'url' => 'https://laravel.com/',
        'remove_icon' => 1,
    ]);
    $response->assertStatus(302);
    $response->assertRedirect(route('resume.edit'));
    $this->assertEquals('Laravel', $skill->fresh()->name);
    $this->assertEquals('https://laravel.com/', $skill->fresh()->url);
    $this->assertNull($skill->fresh()->icon);
});

test('users can prioritize their skills', function () {
    $skill_1 = Skill::factory()->create(['user_id' => $this->user->id]);
    $skill_2 = Skill::factory()->create(['user_id' => $this->user->id]);
    $skill_3 = Skill::factory()->create(['user_id' => $this->user->id]);
    $this->assertEquals(0, $skill_1->fresh()->priority);
    $this->assertEquals(1, $skill_2->fresh()->priority);
    $this->assertEquals(2, $skill_3->fresh()->priority);
    $response = $this->actingAs($this->user)->patch(route('skills.prioritize'), [
        'priorities' => [
            ['id' => $skill_1->id, 'priority' => 2],
            ['id' => $skill_2->id, 'priority' => 0],
            ['id' => $skill_3->id, 'priority' => 1],
        ],
    ]);
    $response->assertStatus(302);
    $response->assertRedirect(route('resume.edit'));
    $this->assertEquals(2, $skill_1->fresh()->priority);
    $this->assertEquals(0, $skill_2->fresh()->priority);
    $this->assertEquals(1, $skill_3->fresh()->priority);
});

test('users can delete a skill', function () {
    $skill_1 = Skill::factory()->create(['user_id' => $this->user->id]);
    $skill_2 = Skill::factory()->create(['user_id' => $this->user->id]);
    $this->assertEquals(2, $this->user->skills()->count());
    $response = $this->actingAs($this->user)->delete(route('skill.delete'), ['id' => $skill_1->id]);
    $response->assertStatus(302);
    $response->assertRedirect(route('resume.edit'));
    $this->assertEquals(1, $this->user->skills()->count());
    $this->assertEquals(0, $skill_2->fresh()->priority);
});
