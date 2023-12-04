# Node.js Server Setup on AWS EC2 Instance

This guide outlines the steps to set up a Node.js server on an Amazon Web Services (AWS) EC2 instance.

## Prerequisites
- Access to MS AWS account with admin perm or authorisation to lauch an ec2 instance and configure the permitions and port redirection.
- Access to the repo of the node server.

## Step-by-Step Guide

### 1. Start an EC2 Instance
- Navigate to the AWS EC2 Dashboard.
- Launch a new EC2 instance of your choice (e.g., Ubuntu Server).
- Configure the instance settings as needed and launch it.

### 2. SSH into the Instance
```bash
ssh -i /path/to/your-key.pem ec2-user@<EC2-Instance-IP>
```
Replace /path/to/your-key.pem with your key file path and <EC2-Instance-IP> with the instance's public IP.Ec2 users are usually ubuntu for ubuntu machines if no user has been setup in IAM config, check your config.

### 3. Update and Upgrade the System

```bash
sudo apt update && sudo apt upgrade -y
```
### 4.  Install Yarn

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn

```
### 5.  Install NVM (Node Version Manager)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install node

```

### 6.  Install Git

```bash
sudo apt install git
```

### 7. Generate SSH Key Pair for Server

```bash
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

```
Follow the on-screen instructions. Don't forget to replace your-email@example.com with your email.

### 8. Add SSH Public Key to GitHub Repository

- Display and copy the public key.
```bash
cat ~/.ssh/id_rsa.pub

```

- Add it to your GitHub repository under Settings → Deploy keys.

### 9.  Clone the Repository

```bash
git clone git@github.com:username/repo.git

```
### 10. Environment Configuration

- Set CLIENT_URL and PORT environment variables in your .env file or export them in the shell.

### 11. Install Project Dependencies

Navigate to your project directory at the level of your package.json and run:

```bash 
yarn install

```
### 12. Install Puppeteer Dependencies

Check Puppeteer's [troubleshooting guide]('https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix') for required dependencies.

### 13.  Install PM2

```bash 
yarn global add pm2

```

### 14. Launch the Application with PM2
```bash
pm2 start dist/index.js --name "ms-node-server"

```

### 15. Configure PM2 for Startup

```bash
pm2 save
pm2 startup

```

### 16. Testing

- Test the application to ensure it's running as expected.
- Access your server using the public IP or domain name.