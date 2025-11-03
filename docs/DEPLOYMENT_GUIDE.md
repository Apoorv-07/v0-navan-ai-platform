# Navan Platform - Complete Deployment Guide

> This guide covers everything you need to deploy Navan from local development to production. No prior deployment experience required.

---

## Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [Production Deployment Options](#production-deployment-options)
3. [Environment Variables](#environment-variables)
4. [Troubleshooting](#troubleshooting)
5. [Testing Checklist](#testing-checklist)

---

## Local Development Setup

### Prerequisites

Before starting, ensure you have these installed on your computer:

**Windows/Mac/Linux:**
- [ ] **Node.js** v18+ or v20+ (Download from [nodejs.org](https://nodejs.org))
  - Verify: Open terminal/command prompt and run `node --version`
- [ ] **npm** or **yarn** (comes with Node.js)
  - Verify: Run `npm --version`
- [ ] **Git** (Download from [git-scm.com](https://git-scm.com))
  - Verify: Run `git --version`
- [ ] **MongoDB** (Choose Option A or B below)

### MongoDB Setup

#### Option A: MongoDB Atlas (Cloud - Recommended for Beginners)

**Why choose this?** Cloud-hosted, no local installation needed, free tier available.

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Click "Sign Up with Email"
   - Fill in your details and verify email
   - Accept terms and create account

2. **Create Free Cluster**
   - Click "Create" on the home page
   - Select "Build a Database"
   - Choose "Free" tier (M0 - 512MB storage)
   - Select cloud provider: **AWS**
   - Choose nearest region to you
   - Click "Create Deployment"

3. **Create Database User**
   - Wait for cluster to deploy (2-3 minutes)
   - Click "Security" → "Database Access"
   - Click "Add New Database User"
   - Set username and password
   - **Save these credentials - you'll need them!**
   - Click "Add User"

4. **Whitelist Your IP**
   - Go to "Security" → "Network Access"
   - Click "Add IP Address"
   - Select "Allow access from anywhere" (0.0.0.0/0) for development
   - ⚠️ **Important:** Change to your specific IP in production
   - Click "Confirm"

5. **Get Connection String**
   - Click "Database" → "Connect"
   - Select "Connect your application"
   - Choose "Node.js" and version "4.1 or later"
   - Copy the connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/navan?retryWrites=true&w=majority`
   - **Replace:**
     - `username` with your database user
     - `password` with your password
     - `navan` is your database name (keep it)

**Example:**
\`\`\`
mongodb+srv://john_dev:MySecurePass123@navan-cluster.mongodb.net/navan?retryWrites=true&w=majority
\`\`\`

#### Option B: Local MongoDB Installation

**Why choose this?** Full control, no internet needed during development.

**Windows:**
```powershell
# Download MongoDB Community Edition
# https://www.mongodb.com/try/download/community

# Or use Chocolatey (if installed):
choco install mongodb-community

# Start MongoDB:
mongod
