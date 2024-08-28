# React Resumes
This Breezehome based web application allows users to create, edit, and download resumes in PDF format. The generated PDF is html rendered via react templates and styled with tailwind css, just like the web application itself.

## Requirements
- PHP 8.3
- Composer
- NodeJS 22
- Yarn
- OpenSSL
- Docker & Docker Compose
- CertUtil

For Windows users it is HIGHLY recommended to use WSL2 and install the above dependencies on any distro of your choice (E.G Ubuntu). It's also recommended to store the project in your WSL filesystem. This is because the Docker development environment is very slow on regular Windows.

## Installation
1. Begin by cloning this repository with git or an IDE of your choice
2. You can either use your own certificates or follow [this guide](https://gist.github.com/cecilemuller/9492b848eb8fe46d462abeb26656c4f8) to generate local ssl certificates, where you will also need to install the root certificate into your machine's trusted root certification authorities and place the ssl cert and key in the docker/ssl/certs folder, ensuring they are named 'localhost.crt' and 'localhost.key' respectively.
3. Run `composer install`
4. Run `yarn`
5. Run `cp .env.example .env`
6. Set the xDebug remote host to your local machine's IP address in the .env file
7. If you want to use Sentry, set the SENTRY_DSN variable to your Sentry DSN's address.
8. use the gen-key script to generate a unique key to set for the CHROMIUM_KEY env variable
9. Modify any other variables in the .env file as needed.
10. Run `php artisan key:generate`
11. Run `php artisan migrate` from within the web container not your host machine terminal
12. Run `npm run build`
13. Use certutil to add your local Root CA cert to an nssdb for chromium, for example if using the chromium container and your cert is located in docker/ssl/certs:
`certutil -d sql:docker/chromium/nssdb -A -t "C,," -n "Local Root CA" -i docker/ssl/certs/RootCA.crt`

## Running the application
To start the local development environment powered by Docker, run `docker-compose up -d`

Once the containers are up and running, you just need to create the breezehome-public bucket and give it public access permissions at https://localhost:9001

You can now access your application on https://localhost:4430 😎

## Usage
### Creating an account
Register a new account as normal with any other default laravel application.
### Creating a resume
Once you have created an account and logged in, you can navigate to the resume edit page by clicking the `Resume` link in the header, where you can follow the step bystep process to setup your profile and enter all your information. Once you reach the final step, you will be able to preview what your resume will look like and then download it in PDF format! 🎉
