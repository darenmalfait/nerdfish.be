---
seo:
  title: Installing MySQL on macOS with Homebrew
  description: |
    Step-by-step guide on how to install MySQL on macOS using Homebrew, including service setup, password configuration, and testing
title: Installing MySQL on macOS with Homebrew
tags:
  - devops
  - webdevelopment
excerpt: |
  Step-by-step guide on how to install MySQL on macOS using Homebrew, including service setup, password configuration, and testing
date: 2025-09-04T15:00:00.000Z
---

## Introduction

MySQL is a popular open-source relational database management system (RDBMS). It
is widely used for web applications, data analysis, and other database-driven
tasks. This blog post will guide you through the steps on how to install MySQL
on macOS using Homebrew, a package manager for macOS.

## Prerequisites

Before you begin, ensure you have the following:

## macOS 10.15 or later

Homebrew installed. If you don't have Homebrew, you can install it by running
the following command in Terminal:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Installing MySQL with Homebrew

To install MySQL using Homebrew, run the following command in Terminal:

```bash
brew install mysql
```

This command will install the MySQL server and client.

Starting the MySQL Service Once MySQL is installed, you need to start the
service. Run the following command in Terminal:

```bash
brew services start mysql
```

Setting the MySQL Password By default, MySQL does not have a password set. To
set a password, run the following command in Terminal:

```bash
mysql -u root -p
```

You will be prompted to enter the current password. Since you have not set a
password yet, press Enter.

Next, you will be prompted to enter a new password. Enter a strong password and
press Enter.

Confirm the password by entering it again and pressing Enter.

Testing the MySQL Installation To test if MySQL is installed and running
correctly, run the following command in Terminal:

```bash
mysql -u root -p
```

Enter the password you set earlier.

If you are able to connect to the MySQL server, you will see the MySQL prompt:

mysql> You can now run MySQL commands to create databases, tables, and perform
other database operations.

## Changing PW

For MySQL < 8.0

```bash
UPDATE mysql.user SET Password = PASSWORD('YOURNEWPASSWORD') WHERE User = 'root';
FLUSH PRIVILEGES;
```

> If your MySQL uses new auth plugin, you will need to use: update user set
> plugin="mysql_native_password" where User='root'; before flushing privileges.

**Note: on some versions, if password column doesn't exist, you may want to
try:**

```bash
UPDATE user SET authentication_string=password('YOURNEWPASSWORD') WHERE user='root';
```

Note: This method is not regarded as the most secure way of resetting the
password, however, it works.

### For MySQL >= 8.0

```bash
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'YOURNEWPASSWORD';
FLUSH PRIVILEGES;
```

## Config

Configuring MySQL with Configuration File Before starting the MySQL service, you
can optionally configure MySQL using the configuration file. The configuration
file is located at /usr/local/etc/my.cnf.

To edit the configuration file, run the following command in Terminal:

```bash
sudo nano /usr/local/etc/my.cnf
```

In the configuration file, you can set various options to customize MySQL's
behavior. For example, you can change the default port, set the maximum number
of connections, or enable slow query logging.

Here is an example configuration file:

```
[mysqld]
bind-address = 127.0.0.1
port = 3306
max_connections = 100
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
```

In this example, we have set the following options:

- `bind-address`: The IP address that MySQL will listen on.
- `port`: The port that MySQL will listen on.
- `max_connections`: The maximum number of connections that MySQL will allow.
- `slow_query_log`: Enable slow query logging.
- `slow_query_log_file`: The file where slow queries will be logged.

## Conclusion

You have successfully installed MySQL on macOS using Homebrew. You have also
started the MySQL service and set a password. Now you can start using MySQL to
manage your databases.
