# LaMetric ebay

## Stack

- node (main application)
- mongodb (main database)
- redis (for handling things across multiple nodes)
  - state of the rate limiter middleware
  - background processing queues

## Features

### Buyers (No account required)

- best price for keyword
- observ auction

Rate limits:

- 20 requests per windowMs with a window of 60 seconds

### Sellers (User account required)

- revenue
- ratings
- notifications

Rate limits:

- 40 requests per windowMs with a window of 60 seconds (included)
- unlimited requests if billing is enabled

## development

### requirements

- docker
- vs code
- vs code remote container extension

1. open project in remote container
1. use yarn with existing scripts