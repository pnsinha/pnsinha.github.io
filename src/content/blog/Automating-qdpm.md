---
title: 'Automating Task Creation When the "Easy" Import is Broken'
description: 'Automating Task Creation When the "Easy" Import is Broken'
pubDate: 2024-06-19
heroImage: '/blog-placeholder-1.jpg'
author:
  name: "PNSinha"
  avatar: "/images/avatar.jpg"  
---

# Automating Task Creation When the "Easy" Import is Broken

## The Problem That Started It All

Recently, I needed to create 75 experimental task entries in our project management system (qdPM). Each task required multiple fields: experiment ID, parameters, expected outcomes, and various metadata. Having done this manually before, I knew it would take hours of mind-numbing data entry.

Fortunately, qdPM has an "Import Tasks from XLS file" feature. Perfect! I formatted my Excel spreadsheet, uploaded it, and clicked import. Then came the familiar sight that every developer dreads:

```
Parse error: syntax error, unexpected 'new' (T_NEW) in 
/opt/www/rccpm/core/lib/excel_reader.php on line 916
```

A quick investigation revealed the issue: our servers run PHP 7.4 (as they should, for security), but qdPM's import module was written for PHP 5.x. The `new` keyword syntax had changed years ago, and this legacy code had never been updated.

## The Traditional Path (That Led Nowhere)

I followed the usual channels:
- Filed a support ticket
- Documented the exact error and steps to reproduce
- Suggested the simple code fix needed

The responses were predictable: "Not currently on the roadmap," "Consider our cloud version," and "We'll add it to the backlog." Meanwhile, my 75 tasks still needed to be created.

## Building a Solution

Rather than wait indefinitely or spend hours on manual entry, I decided to build an automation solution using Playwright. If the system wouldn't accept my spreadsheet, I'd make it think a very fast human was entering the data.

### The Approach

My solution reads the Excel file and automates the browser to create tasks through the standard web interface:

```javascript
const { chromium } = require('playwright');
const XLSX = require('xlsx');

async function importTasks(excelPath) {
  // Read the Excel file
  const workbook = XLSX.readFile(excelPath);
  const tasks = XLSX.utils.sheet_to_json(workbook.Sheets['Tasks']);
  
  // Launch browser and create tasks
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await login(page);
  
  for (const task of tasks) {
    await createTask(page, task);
    console.log(`✓ Created: ${task.name}`);
  }
  
  await browser.close();
}
```

### Technical Discoveries

#### Direct URL Navigation
Initially, I tried to replicate the exact user workflow—clicking buttons, waiting for menus to appear. But inspecting the network traffic revealed I could navigate directly to the task creation form:

```javascript
// Skip the UI navigation entirely
const directUrl = `${CONFIG.qdpmUrl}/index.php/tasks/create?projects_id=${projectId}`;
await page.goto(directUrl);
```

This simple discovery cut execution time by 60% and eliminated timing-related failures.

#### Handling Legacy Form Quirks
The aging system had specific requirements about field order and timing:

```javascript
async function fillTaskForm(page, data) {
  // Fields must be filled in specific order
  await page.fill('#tasks_name', data.name);
  await page.waitForTimeout(100); // Legacy JS validation
  
  await page.fill('#tasks_description', data.description);
  await page.selectOption('#tasks_priority_id', data.priority || '3');
  
  // Submit and wait for redirect
  await page.click('button[type="submit"]');
  await page.waitForURL('**/tasks/info/**');
}
```

#### Error Recovery
Network hiccups and session timeouts required robust error handling:

```javascript
async function createTaskWithRetry(page, taskData, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await createTask(page, taskData);
      return { success: true };
    } catch (error) {
      console.log(`Retry ${attempt}/${maxRetries}: ${error.message}`);
      if (attempt < maxRetries) {
        await page.reload();
        await page.waitForTimeout(1000);
      }
    }
  }
  return { success: false, task: taskData.name };
}
```

## Results

The automation successfully created all 75 tasks in about 20 minutes—a process that would have taken 3-4 hours manually. More importantly:

- **Zero data entry errors** (compared to ~5-10% error rate with manual entry)
- **Reproducible process** for future task batches
- **Freed up time** for actual research work
- **Documentation** of task creation for audit purposes

## Lessons Learned

1. **Sometimes the workaround becomes the solution**: My "temporary" script has now processed over 100 tasks and become my standard approach

2. **Simple often beats complex**: Direct URL navigation was more reliable than sophisticated UI automation

3. **Invest in error handling**: The retry logic and error reporting saved hours of debugging

4. **Document everything**: Clear logs made it easy to verify what was created and troubleshoot issues

## The Code

For those facing similar challenges, here's a complete working example:

```javascript
require('dotenv').config();
const { chromium } = require('playwright');
const XLSX = require('xlsx');

const CONFIG = {
  qdpmUrl: process.env.QDPM_URL,
  username: process.env.QDPM_USERNAME,
  password: process.env.QDPM_PASSWORD,
  projectId: process.env.PROJECT_ID
};

async function main() {
  const tasks = readExcelFile('./tasks.xlsx');
  const browser = await chromium.launch({ headless: false });
  
  try {
    const page = await browser.newPage();
    await login(page);
    
    const results = [];
    for (let i = 0; i < tasks.length; i++) {
      console.log(`[${i+1}/${tasks.length}] Processing: ${tasks[i].name}`);
      const result = await createTaskWithRetry(page, tasks[i]);
      results.push(result);
    }
    
    // Summary
    const successful = results.filter(r => r.success).length;
    console.log(`\nCompleted: ${successful}/${tasks.length} tasks created successfully`);
    
  } finally {
    await browser.close();
  }
}

async function login(page) {
  await page.goto(CONFIG.qdpmUrl);
  await page.fill('#email', CONFIG.username);
  await page.fill('#password', CONFIG.password);
  await page.click('button[type="submit"]');
  await page.waitForURL('**/dashboard/**');
}

async function createTask(page, taskData) {
  await page.goto(`${CONFIG.qdpmUrl}/index.php/tasks/create?projects_id=${CONFIG.projectId}`);
  
  await page.fill('#tasks_name', taskData.Name);
  await page.fill('#tasks_description', taskData.Description || '');
  await page.selectOption('#tasks_priority_id', String(taskData.Priority || 3));
  
  if (taskData.AssignedTo) {
    await page.selectOption('#tasks_assigned_to', taskData.AssignedTo);
  }
  
  await page.click('button[type="submit"]');
  await page.waitForURL('**/tasks/info/**', { timeout: 10000 });
}

function readExcelFile(path) {
  const workbook = XLSX.readFile(path);
  const sheetName = workbook.SheetNames[0];
  return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
}

main().catch(console.error);
```

## Moving Forward

This project reinforced an important principle: when faced with broken systems and bureaucratic delays, sometimes the best solution is to build your own. The skills gained—browser automation, error handling, and working with legacy systems—are valuable regardless of the specific tool or platform.

For fellow developers dealing with similar frustrations: don't wait for the perfect fix. Build something that works today. Your future self (and your productivity metrics) will thank you.

---

*Have you built creative workarounds for broken systems? I'd love to hear about your experiences. Feel free to reach out or check out the [full code repository](https://github.com/yourusername/qdpm-automation) for more implementation details.*