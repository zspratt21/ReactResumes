<?php

use App\Models\ResumeOptions;
use App\Models\User;

test('user cannot edit another users resume options', function () {
    $other_user = User::factory()->create();
    $response = $this->actingAs($this->user)->patch(route('resume-options.update'), $this->example([
        'user_id' => $other_user->id,
    ]));
    $response->assertStatus(302);
    $this->assertEquals($other_user->resumeOptions->font, $other_user->resumeOptions->fresh()->font);
    $this->assertEquals($other_user->resumeOptions->color_scheme, $other_user->resumeOptions->fresh()->color_scheme);
    $this->assertEquals($other_user->resumeOptions->layout, $other_user->resumeOptions->fresh()->layout);
});

test('resume options are initialized after a user is created', function () {
    $this->assertNotNull($this->user->resumeOptions);
});

test('user can edit their options', function () {
    $data = $this->example();
    $response = $this->actingAs($this->user)->patch(route('resume-options.update'), $data);
    $response->assertStatus(302);
    $response->assertRedirect(route('resume.edit'));
    $this->assertEquals($data['font'], $this->user->resumeOptions->fresh()->font);
    $this->assertEquals($data['color_scheme'], $this->user->resumeOptions->fresh()->color_scheme);
    $this->assertEquals($data['layout'], $this->user->resumeOptions->fresh()->layout);
});

test('resumeOptions is deleted when user is deleted', function () {
    $id = $this->user->id;
    $this->assertNotNull(ResumeOptions::find(['user_id' => $id])->first());
    $response = $this->actingAs($this->user)->delete(route('profile.destroy', ['password' => 'password']));
    $response->assertStatus(302);
    $this->assertNull(ResumeOptions::find(['user_id' => $id])->first());
});
