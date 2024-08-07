<?php

use App\Models\ResumeProfile;
use App\Models\User;

test('users cannot edit another users resume profile', function () {
    $other_user = User::factory()->create();
    $other_user_resume_profile = ResumeProfile::factory()->create(['user_id' => $other_user->id]);
    $response = $this->actingAs($this->user)->patch(route('resume-profile.update'), $this->example([
        'user_id' => $other_user->id,
    ]));
    $response->assertStatus(302);
    $this->assertEquals($other_user_resume_profile->address, $other_user->resumeProfile->fresh()->address);
    $this->assertEquals($other_user_resume_profile->mobile, $other_user->resumeProfile->fresh()->mobile);
    $this->assertEquals($other_user_resume_profile->linkedin, $other_user->resumeProfile->fresh()->linkedin);
    $this->assertEquals($other_user_resume_profile->github, $other_user->resumeProfile->fresh()->github);
    $this->assertEquals($other_user_resume_profile->twitter, $other_user->resumeProfile->fresh()->twitter);
    $this->assertEquals($other_user_resume_profile->instagram, $other_user->resumeProfile->fresh()->instagram);
    $this->assertEquals($other_user_resume_profile->salesforce, $other_user->resumeProfile->fresh()->salesforce);
    $this->assertEquals($other_user_resume_profile->introduction, $other_user->resumeProfile->fresh()->introduction);
});

test('user can create their resume profile', function () {
    $this->assertNull($this->user->resumeProfile);
    $response = $this->actingAs($this->user)->patch(route('resume-profile.update'), $this->example());
    $response->assertStatus(302);
    $response->assertRedirect(route('resume.edit'));
    $this->assertNotNull($this->user->fresh()->resumeProfile);
});

test('user can edit their resume profile', function () {
    $resume_profile = ResumeProfile::factory()->create(['user_id' => $this->user->id]);
    $data = $this->example();
    $response = $this->actingAs($this->user)->patch(route('resume-profile.update'), $data);
    $response->assertStatus(302);
    $response->assertRedirect(route('resume.edit'));
    $this->assertEquals($data['address'], $resume_profile->fresh()->address);
    $this->assertEquals($data['mobile'], $resume_profile->fresh()->mobile);
    $this->assertEquals($data['linkedin'], $resume_profile->fresh()->linkedin);
    $this->assertEquals($data['github'], $resume_profile->fresh()->github);
    $this->assertEquals($data['twitter'], $resume_profile->fresh()->twitter);
    $this->assertEquals($data['instagram'], $resume_profile->fresh()->instagram);
    $this->assertEquals($data['salesforce'], $resume_profile->fresh()->salesforce);
    $this->assertEquals($data['introduction'], $resume_profile->fresh()->introduction);
});
