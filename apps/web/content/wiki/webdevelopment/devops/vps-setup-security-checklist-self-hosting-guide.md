---
seo:
  title: 2025 VPS Setup and Security Checklist (hetzner cloud)
  description: |
    Complete VPS setup checklist covering server security, SSH configuration, firewall setup, and production deployment. Step-by-Step guide with commands and troubleshooting tips for self-hosting applications.
title: 2025 VPS Setup and Security Checklist (hetzner cloud)
tags:
  - devops
  - webdevelopment
excerpt: |
  Complete VPS setup checklist covering server security, SSH configuration, firewall setup, and production deployment. Step-by-Step guide with commands and troubleshooting tips for self-hosting applications.
date: 2025-11-03T15:00:00.000Z
---

source:
[https://bhargav.dev/blog/VPS_Setup_and_Security_Checklist_A_Complete_Self_Hosting_Guide](https://bhargav.dev/blog/VPS_Setup_and_Security_Checklist_A_Complete_Self_Hosting_Guide)

## Pre-Setup Checklist

**Before You Begin:**

- Choose your VPS provider (Hetzner recommended for price/performance)
- Select server specifications (minimum 1GB RAM, 20GB storage)
- Note down server IP address and root credentials
- Prepare your local machine with SSH client
- Have a strong password generator ready

## Picking the VPS provider

- Chose **Hetzner Cloud** (cheap, fast, reliable in Europe)
- Alternatives I considered:
  - **DigitalOcean** → smoother onboarding, great docs, slightly more expensive
  - **AWS Lightsail** → decent for small apps, but tied to AWS ecosystem
    (complex for beginners)
  - **Linode** → reliable, but Hetzner wins on price/performance
  - **Render/Fly.io** → easier PaaS, but more opinionated and costly at scale

**Why Hetzner?**

- 2–3x cheaper for the same specs compared to DO/AWS
- Strong European datacenter presence (latency advantage for my use case)
- Transparent pricing and no surprise bills

## Initial Server Setup Checklist

#### First Login and System Updates

- **Initial login as root**

```bash
ssh root@your-server-ip
```

- **Update package lists and upgrade system**

```bash
apt update && apt upgrade -y
```

- **Verify system information**

```bash
uname -a
cat /etc/os-release
```

#### Root Account Security

- **Change root password**

```bash
passwd
```

    - Use strong password with mixed case, numbers, symbols
    - Store securely in password manager

- **Create secondary user account**

```bash
adduser your-username
```

    - Choose descriptive username (not 'admin' or 'user')
    - Set strong password

- **Add user to sudo group**

```bash
usermod -aG sudo your-username
```

- **Verify user groups**

```bash
groups your-username
```

    - Should show: `your-username : your-username sudo`

- **Test sudo access**

```bash
su - your-username
sudo whoami
```

    - Should return: `root`

#### SSH Key Authentication Setup

- **Generate SSH keys on LOCAL machine** (not server)

```bash
#### Ed25519 (recommended)
ssh-keygen -t ed25519 -C "your-email@example.com"

##### Or RSA if Ed25519 not supported
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
```

- **Display public key on local machine**

```bash
cat ~/.ssh/id_ed25519.pub
#### or
cat ~/.ssh/id_rsa.pub
```

- **Copy public key to clipboard**
- **Create .ssh directory on server** (as your user, not root)

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
```

- **Create authorized_keys file**

```bash
nano ~/.ssh/authorized_keys
```

    - Paste your public key
    - Save and exit

- **Set correct permissions**

```bash
chmod 600 ~/.ssh/authorized_keys
```

- **Test SSH key login** (from local machine)

```bash
ssh your-username@your-server-ip
```

    - Should login without password prompt

#### Disable Password Authentication

- **Edit SSH configuration**

```bash
sudo nano /etc/ssh/sshd_config
```

- **Modify these settings:**

```bash
PasswordAuthentication no
PubkeyAuthentication yes
```

- **Check cloud-init config if exists**

```bash
sudo nano /etc/ssh/sshd_config.d/50-cloud-init.conf
```

    - Set `PasswordAuthentication no` here too if file exists

- **Test SSH configuration**

```bash
sudo sshd -t
```

    - Should show no errors

- **Restart SSH service**

```bash
sudo systemctl restart ssh
#### or
sudo service ssh restart
```

- **Verify service status**

```bash
sudo systemctl status ssh
```

    - Should show active (running) with green dot

#### Disable Root Login

- **Edit SSH configuration**

```bash
sudo nano /etc/ssh/sshd_config
```

- **Change root login setting**

```bash
PermitRootLogin no
```

- **Restart SSH service**

```bash
sudo systemctl restart ssh
```

- **Test root login is blocked** (from another terminal)

```bash
ssh root@your-server-ip
```

    - Should get "Permission denied"

## Firewall Configuration Checklist

#### UFW (Uncomplicated Firewall) Setup

- **Check UFW status**

```bash
sudo ufw status
```

- **Set default policies**

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

- **Allow SSH before enabling firewall**

```bash
sudo ufw allow ssh
#### or if you changed SSH port:
sudo ufw allow 2022/tcp
```

- **Allow HTTP and HTTPS for web apps**

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

- **Enable firewall**

```bash
sudo ufw enable
```

    - Type 'y' when prompted

- **Verify firewall rules**

```bash
sudo ufw status verbose
```

#### Advanced Firewall Configuration

- **Restrict SSH to your IP** (optional but recommended)

```bash
sudo ufw allow from YOUR_IP_ADDRESS to any port 22
sudo ufw delete allow ssh
```

- **Change default SSH port** (optional security through obscurity)

```bash
sudo nano /etc/ssh/sshd_config
```

    - Change `Port 22` to `Port 2022` (or your chosen port)
    - Update firewall: `sudo ufw allow 2022/tcp`
    - Remove old rule: `sudo ufw delete allow 22/tcp`
    - Restart SSH: `sudo systemctl restart ssh`

## Automatic Updates Setup Checklist

#### Unattended Upgrades Configuration

- **Install unattended-upgrades**

```bash
sudo apt install unattended-upgrades apt-listchanges
```

- **Enable automatic updates**

```bash
sudo dpkg-reconfigure unattended-upgrades
```

    - Select "Yes" in the dialog

- **Configure update settings**

```bash
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
```

- **Uncomment security updates line**

```bash
"${distro_id}:${distro_codename}-security";
```

- **Configure email notifications** (optional)

```bash
Unattended-Upgrade::Mail "your-email@example.com";
```

- **Enable automatic reboots if needed**

```bash
Unattended-Upgrade::Automatic-Reboot "true";
Unattended-Upgrade::Automatic-Reboot-Time "02:00";
```

- **Test configuration**

```bash
sudo unattended-upgrades --dry-run
```

- **Check service status**

```bash
sudo systemctl status unattended-upgrades
```

## Production Application Deployment Checklist

#### Node.js Production Setup

- **Install Node.js LTS**

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

- **Verify installation**

```bash
node --version
npm --version
```

- **Install PM2 globally**

```bash
sudo npm install -g pm2
```

- **Upload your application files**

```bash
scp -r ./your-app your-username@your-server-ip:~/
```

- **Install dependencies**

```bash
cd ~/your-app
npm install --production
```

- **Create production build**

```bash
npm run build
```

#### Process Manager Configuration

- **Start application with PM2**

```bash
NODE_ENV=production pm2 start app.js --name "your-app"
```

- **Configure PM2 for clustering** (optional)

```bash
pm2 start app.js -i max --name "your-app-cluster"
```

- **Save PM2 configuration**

```bash
pm2 save
```

- **Enable PM2 startup**

```bash
pm2 startup
#### Run the command it outputs
```

- **Test application restart**

```bash
pm2 restart all
pm2 status
```

#### Reverse Proxy Setup (Nginx)

- **Install Nginx**

```bash
sudo apt install nginx
```

- **Create site configuration**

```bash
sudo nano /etc/nginx/sites-available/your-app
```

- **Basic Nginx configuration**

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

- **Enable site**

```bash
sudo ln -s /etc/nginx/sites-available/your-app /etc/nginx/sites-enabled/
```

- **Test Nginx configuration**

```bash
sudo nginx -t
```

- **Restart Nginx**

```bash
sudo systemctl restart nginx
```

## SSL Certificate Setup Checklist

#### Let's Encrypt with Certbot

- **Install Certbot**

```bash
sudo apt install certbot python3-certbot-nginx
```

- **Obtain SSL certificate**

```bash
sudo certbot --nginx -d your-domain.com
```

- **Test automatic renewal**

```bash
sudo certbot renew --dry-run
```

- **Verify SSL grade**
- Visit: https://www.ssllabs.com/ssltest/
- Should get A or A+ rating

## Monitoring and Maintenance Checklist

#### Basic Monitoring Setup

- **Install monitoring tools**

```bash
sudo apt install htop iotop netstat-nat
```

- **Check system resources**

```bash
htop
df -h
free -h
```

- **Monitor logs**

```bash
sudo tail -f /var/log/syslog
sudo tail -f /var/log/auth.log
```

- **Set up log rotation**

```bash
sudo nano /etc/logrotate.d/your-app
```

#### Backup Strategy

- **Create backup script**

```bash
nano ~/backup.sh
```

- **Sample backup script**

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf ~/backups/app_backup_$DATE.tar.gz ~/your-app
#### Add database backup commands if needed
```

- **Make script executable**

```bash
chmod +x ~/backup.sh
```

- **Set up automated backups**

```bash
crontab -e
```

    - Add: `0 2 * * * /home/username/backup.sh`

## Troubleshooting Checklist

#### Common Issues and Solutions

**SSH Connection Problems:**

- Check firewall rules: `sudo ufw status`
- Verify SSH service: `sudo systemctl status ssh`
- Check SSH logs: `sudo tail -f /var/log/auth.log`
- Test from different network

**Permission Denied Errors:**

- Check file permissions: `ls -la`
- Verify user groups: `groups username`
- Check sudo configuration: `sudo -l`

**Service Not Starting:**

- Check service status: `sudo systemctl status service-name`
- View service logs: `sudo journalctl -u service-name`
- Check configuration files syntax

**High Resource Usage:**

- Identify processes: `htop`
- Check disk usage: `df -h`
- Monitor network: `netstat -tulpn`
- Review application logs

## Final Verification Checklist

#### Security Verification

- **Test SSH key authentication works**
- **Verify password authentication is disabled**
- **Confirm root login is blocked**
- **Check firewall is active and configured**
- **Verify automatic updates are working**
- **Test application runs in production mode**
- **Confirm SSL certificate is valid**
- **Verify backups are being created**

#### Performance Testing

- **Run basic load test**

```bash
#### Install Apache Bench
sudo apt install apache2-utils

#### Test with 100 requests, 10 concurrent
ab -n 100 -c 10 http://your-domain.com/
```

- **Monitor resource usage during load**

```bash
htop
```

- **Check application logs for errors**

```bash
pm2 logs
```

## Quick Reference Commands

**System Information:**

```bash
htop                    # System monitor
df -h                   # Disk usage
free -h                 # Memory usage
uname -a               # System info
```

**Process Management:**

```bash
pm2 status             # PM2 process status
pm2 restart all        # Restart all processes
pm2 logs              # View logs
pm2 monit             # Real-time monitoring
```

**Security:**

```bash
sudo ufw status        # Firewall status
sudo fail2ban-client status  # Fail2ban status
sudo lynis audit system      # Security audit
```

**Services:**

```bash
sudo systemctl status nginx    # Service status
sudo systemctl restart nginx   # Restart service
sudo journalctl -u nginx      # Service logs
```

## Final thoughts

This checklist provides a complete approach to VPS setup and management. This
isn’t just about saving money. It’s about control and understanding. By
self-hosting with Hetzner + Coolify, I built muscle memory for devops that paid
off in confidence and freedom.

If you’ve been meaning to try VPS hosting, consider this a nudge.
