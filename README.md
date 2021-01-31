# LaMetric ebay

## Stack

- node (main application)
- mongodb (main database)
- redis (for handling things across multiple nodes)
  - state of the rate limiter middleware
  - background processing queues

## LaMetric apps

- eBay: best price for product
- eBay: rare product observation
- eBay: observe auction

Rate limits:

- 20 requests per windowMs with a window of 60 seconds per IP-Address

## development

### requirements

- docker
- vs code
- vs code remote container extension

1. open project in remote container
1. use yarn with existing scripts

## deployment: production

### prerequisits:

- running docker swarm cluster
  - treafik v2 running on manager/s
  - consul or etcd for sharing let's encrypt certs
- mongodb cluster (e.g. atlas)

### configuration

### deploy:
  - edit docker-compose.treafik.yml (uncomment mongodb service if not using atlas)
  - docker stack deploy -c docker-compose.treafik.yml lametric

### deployment info:
- teaefik-dashboard: https://traefik.adrianfilipow.com
- lametric-ebay-api: https://lametric-ebay-api.adrianfilipow.com
- lametric-frontend: lametric-ebay.adrianfilipow.com (coming soon)

Swarm Entrypoint IP:
- 78.47.97.194

### monitoring:

  - https://grafana.adrianfilipow.com
  - https://alertmanager.adrianfilipow.com
  - https://unsee.adrianfilipow.com
  - https://prometheus.adrianfilipow.com

### devops:

- workflows
  - main.yml
    - test application
    - build and push staging image
    - rollout in staging environment
    - external intergration testing
    - discord notification
  - prod.yml
    - test application
    - build and push production image
    - rollout in production environment
    - external intergration testing
    - discord notification
