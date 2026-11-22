import { spawn, execSync } from 'child_process';
import net from 'net';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Terminal ANSI Colors
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const BLUE = '\x1b[34m';
const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BG_BLUE = '\x1b[44m\x1b[37m\x1b[1m';
const BG_CYAN = '\x1b[46m\x1b[30m\x1b[1m';

const BACKEND_PORT = 5000;
const FRONTEND_PORT = 5173;

console.log(`${BOLD}${CYAN}`);
console.log('===============================================================');
console.log('       🧺 LAUNDRY VISION (런드리 비전) 통합 서버 실행기        ');
console.log('===============================================================');
console.log(`${RESET}`);
console.log(` ${GREEN}●${RESET} 백엔드 API 서버 (Express + SQLite):  ${BOLD}http://localhost:${BACKEND_PORT}${RESET}`);
console.log(` ${CYAN}●${RESET} 프론트엔드 웹 (React + Vite):       ${BOLD}http://localhost:${FRONTEND_PORT}${RESET}`);
console.log(` ${YELLOW}●${RESET} 종료하려면 터미널에서 ${BOLD}Ctrl + C${RESET}를 누르세요.\n`);

// Helper: Check if a port is in use
function checkPort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(false); // Port is occupied
      } else {
        resolve(true);
      }
    });
    server.once('listening', () => {
      server.close();
      resolve(true); // Port is free
    });
    server.listen(port);
  });
}

// Kill a process and its child processes on Windows
function killProcessTree(pid) {
  if (!pid) return;
  try {
    if (process.platform === 'win32') {
      execSync(`taskkill /pid ${pid} /T /F`, { stdio: 'ignore' });
    } else {
      process.kill(-pid, 'SIGKILL');
    }
  } catch (e) {
    // Process might already be dead
  }
}

async function startAll() {
  // Check ports
  const isBackendPortFree = await checkPort(BACKEND_PORT);
  if (!isBackendPortFree) {
    console.warn(`${YELLOW}[경고] 포트 ${BACKEND_PORT}이 이미 사용 중입니다. 기존 백엔드 프로세스가 실행 중일 수 있습니다.${RESET}`);
  }

  const isFrontendPortFree = await checkPort(FRONTEND_PORT);
  if (!isFrontendPortFree) {
    console.warn(`${YELLOW}[경고] 포트 ${FRONTEND_PORT}이 이미 사용 중입니다. 기존 Vite 프로세스가 실행 중일 수 있습니다.${RESET}`);
  }

  const isWin = process.platform === 'win32';
  const npmCmd = isWin ? 'npm.cmd' : 'npm';

  let backendProcess = null;
  let frontendProcess = null;
  let isShuttingDown = false;

  // Clean shutdown handler
  function shutdown(exitCode = 0) {
    if (isShuttingDown) return;
    isShuttingDown = true;
    console.log(`\n${YELLOW}[LAUNDRY VISION] 서버를 종료합니다...${RESET}`);

    if (backendProcess) {
      killProcessTree(backendProcess.pid);
    }
    if (frontendProcess) {
      killProcessTree(frontendProcess.pid);
    }

    process.exit(exitCode);
  }

  process.on('SIGINT', () => shutdown(0));
  process.on('SIGTERM', () => shutdown(0));

  // 1. Start Backend (Express)
  console.log(`${BLUE}[시스템] 백엔드 서버를 시작합니다... (포트: ${BACKEND_PORT})${RESET}`);
  backendProcess = spawn(npmCmd, ['run', 'dev'], {
    cwd: path.join(__dirname, 'server'),
    shell: true,
    env: { ...process.env, PORT: String(BACKEND_PORT) }
  });

  backendProcess.stdout.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach((line) => {
      if (line.trim()) {
        console.log(`${BG_BLUE} BACKEND ${RESET} ${BLUE}${line}${RESET}`);
      }
    });
  });

  backendProcess.stderr.on('data', (data) => {
    const text = data.toString().trim();
    if (text) {
      // Don't flag standard node notices as fatal errors
      if (text.includes('ExperimentalWarning') || text.includes('Debugger attached')) {
        console.log(`${BG_BLUE} BACKEND ${RESET} ${YELLOW}${text}${RESET}`);
      } else {
        console.error(`${BG_BLUE} BACKEND ERROR ${RESET} ${RED}${text}${RESET}`);
      }
    }
  });

  backendProcess.on('error', (err) => {
    console.error(`\n${RED}${BOLD}❌ [백엔드 실행 실패]${RESET} ${err.message}`);
    shutdown(1);
  });

  backendProcess.on('close', (code) => {
    if (!isShuttingDown) {
      if (code !== 0 && code !== null) {
        console.error(`\n${RED}${BOLD}❌ [백엔드 비정상 종료]${RESET} 종료 코드: ${code}`);
        shutdown(code);
      } else {
        console.log(`${BLUE}[백엔드 종료됨]${RESET}`);
      }
    }
  });

  // 2. Start Frontend (Vite)
  console.log(`${CYAN}[시스템] 프론트엔드 개발 서버를 시작합니다... (포트: ${FRONTEND_PORT})${RESET}`);
  frontendProcess = spawn(npmCmd, ['run', 'dev'], {
    cwd: path.join(__dirname, 'client'),
    shell: true,
    env: { ...process.env }
  });

  frontendProcess.stdout.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach((line) => {
      if (line.trim()) {
        console.log(`${BG_CYAN} FRONTEND ${RESET} ${CYAN}${line}${RESET}`);
      }
    });
  });

  frontendProcess.stderr.on('data', (data) => {
    const text = data.toString().trim();
    if (text) {
      console.error(`${BG_CYAN} FRONTEND ERROR ${RESET} ${RED}${text}${RESET}`);
    }
  });

  frontendProcess.on('error', (err) => {
    console.error(`\n${RED}${BOLD}❌ [프론트엔드 실행 실패]${RESET} ${err.message}`);
    shutdown(1);
  });

  frontendProcess.on('close', (code) => {
    if (!isShuttingDown) {
      if (code !== 0 && code !== null) {
        console.error(`\n${RED}${BOLD}❌ [프론트엔드 비정상 종료]${RESET} 종료 코드: ${code}`);
        shutdown(code);
      } else {
        console.log(`${CYAN}[프론트엔드 종료됨]${RESET}`);
      }
    }
  });
}

startAll().catch((err) => {
  console.error(`${RED}통합 서버 실행 중 오류 발생:${RESET}`, err);
  process.exit(1);
});
