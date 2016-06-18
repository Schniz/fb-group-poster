# FB Group Poster

Posts to a facebook group using your credentials using Selenium WebDriver.
Works well with bots to share things you love with your friends.

# Usage

Deploy it using Dokku or just Docker.

## Env vars

- `SECRET` - the secret key to verify the signed message.
- `USER_EMAIL` - the poster email.
- `USER_PASS` - the poster password.

## Routes

### `GET /`

returns `ready` for uptime checks.

### `POST /`

receives a body with `signed` as a jwt signed message in the format:

```json
{
	"text": "the message to type",
	"groupId": "FACEBOOK_GROUP_OD"
}
```

i.e., if we post the following body to the route (using the secret `keyboard cat`):

```json
{
	"signed": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXh0IjoiaGVsbG8gdGhlcmUiLCJncm91cElkIjoibXlGYWNlYm9va0dyb3VwIiwiaWF0IjoxNDY2MjQyNDExfQ.wqs0x6Z6Jnwa5MLa4mTLWvjxw6kGLiG7Yr1OLZF9jn4"
}
```

we will post `hello there` to the `myFacebookGroup` group.

# Thanks

- @vvo for the [vvoyer/docker-selenium-firefox-chrome](https://hub.docker.com/r/vvoyer/docker-selenium-firefox-chrome/) docker image.
