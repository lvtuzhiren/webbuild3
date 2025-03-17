// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const timeDisplay = document.querySelector('.time-display');
    const startStopButton = document.getElementById('startStop');
    const resetButton = document.getElementById('reset');
    const progressCircle = document.querySelector('.progress');
    
    // 计时器变量
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let totalSeconds = 0;
    let intervalId = null;
    let isRunning = false;
    
    // 圆形进度条相关
    const circumference = 2 * Math.PI * 45; // 圆的周长
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;
    
    // 格式化时间显示
    function formatTime(val) {
        return val.toString().padStart(2, '0');
    }

    // 更新显示时间
    function updateDisplay() {
        timeDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
        
        // 更新进度条 - 这里以60分钟为一个周期
        const progress = (totalSeconds % 3600) / 3600;
        const offset = circumference - (progress * circumference);
        progressCircle.style.strokeDashoffset = offset;
    }

    // 计时器逻辑
    function updateTimer() {
        seconds++;
        totalSeconds++;
        
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
        
        updateDisplay();
    }

    // 重置计时器
    function resetTimer() {
        clearInterval(intervalId);
        seconds = 0;
        minutes = 0;
        hours = 0;
        totalSeconds = 0;
        isRunning = false;
        
        // 重置按钮状态
        startStopButton.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
            </svg>
            <span>开始</span>
        `;
        
        // 重置进度条
        progressCircle.style.strokeDashoffset = circumference;
        
        updateDisplay();
        
        // 添加动画效果
        timeDisplay.animate([
            { opacity: 0.5, transform: 'scale(0.95)' },
            { opacity: 1, transform: 'scale(1)' }
        ], {
            duration: 300,
            easing: 'ease-out'
        });
    }

    // 开始/暂停按钮点击事件
    startStopButton.addEventListener('click', () => {
        if (!isRunning) {
            // 开始计时
            intervalId = setInterval(updateTimer, 1000);
            startStopButton.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/>
                </svg>
                <span>暂停</span>
            `;
        } else {
            // 暂停计时
            clearInterval(intervalId);
            startStopButton.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                </svg>
                <span>开始</span>
            `;
        }
        
        isRunning = !isRunning;
        
        // 添加按钮点击动画
        startStopButton.animate([
            { transform: 'scale(0.95)' },
            { transform: 'scale(1)' }
        ], {
            duration: 200,
            easing: 'ease-out'
        });
    });

    // 重置按钮点击事件
    resetButton.addEventListener('click', () => {
        resetTimer();
        
        // 添加按钮点击动画
        resetButton.animate([
            { transform: 'scale(0.95)' },
            { transform: 'scale(1)' }
        ], {
            duration: 200,
            easing: 'ease-out'
        });
    });
    
    // 初始化显示
    updateDisplay();
}); 