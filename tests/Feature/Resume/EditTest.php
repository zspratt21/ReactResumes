<?php

test('users can view resume edit page', function () {
    $response = $this->actingAs($this->user)->get(route('resume.edit'));
    $response->assertStatus(200);
});
