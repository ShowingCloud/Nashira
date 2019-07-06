# Nashira
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FShowingCloud%2FNashira.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FShowingCloud%2FNashira?ref=badge_shield)

Showing Cloud Account System Built on OpenID Connect with Authentication and Authorization.

This system acts as a standalone system to provide account funcationalities, interacts with the internal (and maybe external) OpenLDAP and Kerberos systems, provides sign up and log in services as an individual provider for the SSO system, and exchanges data with other identity providers.

With the described design pattern, users log in from the application systems, probably, redirected to the SSO system and then to this system, with two separate OIDC calls. Users willing to log out of Showing Cloud SSO can choose if to log out of Showing Cloud Account System as well, or they won't be required to use their credentials to log in for the next time.

Information exchanging protocols, schemes and policies are to be designed through the construction of the systems.


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FShowingCloud%2FNashira.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FShowingCloud%2FNashira?ref=badge_large)