# About
Clone of the basic functionality at [v1.requestbin.net](https://v1.requestbin.net/)

# Run
## Locally
* Install dependencies: `$ npm install`
* Start: `$ npm start`

# Database - Postgres
## Local
### Create 
1) `$ psql postgres`
2) `postgres=# CREATE DATABASE requestbin;`

### Setup
1) `$ psql requestbin`
2) `requestbin=# \i ./sql/teardown.sql`
3) `requestbin=# \i ./sql/schema.sql`
4) `requestbin=# \i ./sql/test_data.sql`

## VPS
### Create
1) `$ sudo -u postgres psql`
2) `postgres=# CREATE DATABASE requestbin;`

### Setup
1) `$ psql requestbin` OR `postgres=# \c requestbin`
2) `requestbin=# \i ./sql/teardown.sql`
3) `requestbin=# \i ./sql/schema.sql`
4) `requestbin=# \i ./sql/test_data.sql`

# Database - Mongo
## Local
### Download 
1) Follow [these](https://zellwk.com/blog/install-mongodb/) instructions to install Mongo locally

### Run
1) start mongo: `$ brew services run mongodb-community`
2) stop mongo: `$ brew services stop mongodb-community`

# VPS instructions
* [full instructions](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04)
* create file in `/etc/nginx/sites-available` with domain 
* create symlink between ^ and `/etc/nginx/sites-enabled/requestbin.scttgrhm.dev`
  * `$ sudo ln -s /etc/nginx/sites-available/requestbin.scttgrhm.dev /etc/nginx/sites-enabled/`
* obtain SSL certificate
  * `$ sudo certbot --nginx -d requestbin.scttgrhm.dev -d www.requestbin.scttgrhm.dev`

## Start with PM2
* `$ pm2 start index.js --name requestbin`