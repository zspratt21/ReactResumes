<?php

namespace App\Http\Controllers;

use Spatie\Browsershot\Browsershot;

class BrowserShotTestController extends Controller
{
    public function show()
    {
        $browserShot = Browsershot::url(env('APP_URL', 'http://localhost'))
            ->setRemoteInstance(env('CHROMIUM_HOST', 'chromium'), env('CHROMIUM_PORT', '9222'))
            ->waitUntilNetworkIdle()
            ->format('A4')
            ->showBackground()
            ->noSandbox();

        header('Content-Type: application/pdf');
        header('Content-Disposition: inline; filename="'.'test'.'"');
        echo $browserShot->pdf();
    }
}
