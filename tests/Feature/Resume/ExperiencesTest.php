<?php

use App\Models\Experience;
use App\Models\User;
use Illuminate\Http\UploadedFile;

test('users cannot interact with other users experiences', function () {
    $other_user = User::factory()->create();
    $experience = Experience::factory()->create(['user_id' => $other_user->id]);
    $response_modify = $this->actingAs($this->user)->patch(
        route('experience.modify'),
        $this->example(['id' => $experience->id])
    );
    $response_modify->assertStatus(302);
    $this->assertEquals(0, $this->user->experiences()->count());
    $this->assertEquals($experience->id, $experience->fresh()->id);
    $this->assertEquals($experience->title, $experience->fresh()->title);
    $this->assertEquals($experience->entity, $experience->fresh()->entity);
    $this->assertEquals($experience->type, $experience->fresh()->type);
    $this->assertEquals($experience->start_date, $experience->fresh()->start_date);
    $this->assertEquals($experience->end_date, $experience->fresh()->end_date);
    $this->assertEquals($experience->description, $experience->fresh()->description);
    $this->assertEquals($other_user->id, $experience->fresh()->user_id);
    $response_delete = $this->actingAs($this->user)->delete(
        route('experience.delete'),
        ['id' => $experience->id]
    );
    $response_delete->assertStatus(302);
    $this->assertNotNull($experience->fresh());
});

test('users can create an experience', function () {
    $this->assertEquals(0, $this->user->experiences()->count());
    $image_file = UploadedFile::fake()->image('logo.png');
    $data = $this->example(['file_image' => $image_file]);
    $response = $this->actingAs($this->user)->patch(route('experience.modify'), $data);
    $response->assertStatus(302);
    $response->assertRedirect(route('resume.edit'));
    $this->assertNotNull($this->user->experiences()->first()->image);
    $this->assertEquals(1, $this->user->experiences()->count());
});

test('users can edit an experience', function () {
    $experience = Experience::factory()->create(['user_id' => $this->user->id]);
    $image_file = UploadedFile::fake()->image('logo.png');
    $image_path = $image_file->store("/users/{$this->user->id}/experiences");
    $experience->image = $image_path;
    $experience->save();
    $this->assertNotNull($experience->fresh()->image);
    $data = $this->example([
        'id' => $experience->id,
        'remove_image' => 1,
    ]);
    $response = $this->actingAs($this->user)->patch(route('experience.modify'), $data);
    $response->assertStatus(302);
    $response->assertRedirect(route('resume.edit'));
    $this->assertEquals($data['title'], $experience->fresh()->title);
    $this->assertEquals($data['entity'], $experience->fresh()->entity);
    $this->assertEquals($data['type'], $experience->fresh()->type);
    $this->assertEquals($data['start_date'], $experience->fresh()->start_date->toDateString());
    $this->assertEquals($data['end_date'], $experience->fresh()->end_date->toDateString());
    $this->assertEquals($data['description'], $experience->fresh()->description);
    $this->assertNull($experience->fresh()->image);
});

test('users can delete an experience', function () {
    $experience = Experience::factory()->create(['user_id' => $this->user->id]);
    $this->assertEquals(1, $this->user->experiences()->count());
    $response = $this->actingAs($this->user)->delete(route('experience.delete'), ['id' => $experience->id]);
    $response->assertStatus(302);
    $response->assertRedirect(route('resume.edit'));
    $this->assertEquals(0, $this->user->experiences()->count());
});
