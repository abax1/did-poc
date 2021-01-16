This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Deployment Process

### Log in to the server
```
ssh -i oracle_key.pem.pub ubuntu@132.145.23.46
```

### Convert the password to base64
You can use a base64 online encoder for this step e.g. https://www.base64decode.org/

### Set the password in the `.env` file
```
cd /usr/share/bioledger-ui
```
`vi .env`
```
REACT_APP_PASSWORD=cGF0cmlja0BiaW8tbGVkZ2VyLmNvbTpCaW9mdWVsMTA1ISE=
```

```
cd /usr/share/evergreen-ui
```
`vi .env`
```
REACT_APP_PASSWORD=cGF0cmlja0BiaW8tbGVkZ2VyLmNvbTpCaW9mdWVsMTA1ISE=
```

### Build the code
`yarn build`
or 
`npm build`
