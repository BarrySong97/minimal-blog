interface Branch {
  startX: number;
  startY: number;
  length: number;
  angle: number;
  lineWidth: number;
  children: Branch[];
  growthProgress: number;
  bloomProgress: number;
  color: string;
  controlPoints?: {
    cp1x: number;
    cp1y: number;
    cp2x: number;
    cp2y: number;
  };
}

interface Petal {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export class SakuraAnimation {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private tree: Branch;
  private petals: Petal[] = [];
  private growthStartTime: number;
  private growthDuration = 8000; // 8 seconds to grow (faster)
  private bloomStartTime: number;
  private bloomDuration = 4000; // 4 seconds to bloom (faster)
  private fallingStartTime: number;
  private maxPetals = 150; // More petals
  private animationFrameId: number | null = null;
  private isDestroyed = false;
  private petalColors = ["#FFCBC4", "#FFB7B2", "#FFDAC1", "#FFD6E0", "#FFC8DD"]; // 更柔和的粉色系

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context");
    this.ctx = ctx;

    // Set canvas size to match its display size
    this.width = canvas.width = canvas.offsetWidth;
    this.height = canvas.height = canvas.offsetHeight;

    // Initialize tree
    this.tree = this.createTree();

    // Set timers
    const now = performance.now();
    this.growthStartTime = now;
    this.bloomStartTime = now + this.growthDuration;
    this.fallingStartTime = now + this.growthDuration + this.bloomDuration;

    // Start animation
    this.animate();

    // Handle resize
    window.addEventListener("resize", this.handleResize);
  }

  private handleResize = () => {
    this.width = this.canvas.width = this.canvas.offsetWidth;
    this.height = this.canvas.height = this.canvas.offsetHeight;
    // Recreate tree with new dimensions
    this.tree = this.createTree();
  };

  private createTree(): Branch {
    // 从右侧开始，位置略低
    const startX = this.width * 0.85;
    const startY = this.height * 0.75;

    return {
      startX,
      startY,
      length: this.height * 0.35,
      angle: -Math.PI / 2 - 0.3, // 向左倾斜
      lineWidth: 14, // 更粗的树干
      children: [],
      growthProgress: 0,
      bloomProgress: 0,
      color: "#6D4C41", // 更深的棕色，更接近图片中的树干颜色
    };
  }

  private generateBranches(branch: Branch, depth: number = 0): void {
    if (depth > 5) return; // 增加递归深度，使树更丰满

    const numBranches = Math.max(2, 5 - depth); // 增加分支数量
    const branchLength = branch.length * (0.6 + Math.random() * 0.3); // 更长的分支

    const endX =
      branch.startX +
      Math.cos(branch.angle) * branch.length * branch.growthProgress;
    const endY =
      branch.startY +
      Math.sin(branch.angle) * branch.length * branch.growthProgress;

    for (let i = 0; i < numBranches; i++) {
      // 创建更自然的角度变化
      const angleVariation =
        -0.2 + Math.random() * 0.4 + (i - numBranches / 2) * 0.3;
      const angle = branch.angle + angleVariation;

      // 为分支创建控制点，使曲线更自然
      const controlLen = branch.length * (0.3 + Math.random() * 0.4);
      const controlAngle1 = angle + (Math.random() - 0.5) * 0.5;
      const controlAngle2 = angle + (Math.random() - 0.5) * 0.5;

      const cp1x = endX + Math.cos(controlAngle1) * controlLen * 0.5;
      const cp1y = endY + Math.sin(controlAngle1) * controlLen * 0.5;
      const cp2x = endX + Math.cos(controlAngle2) * controlLen * 1.5;
      const cp2y = endY + Math.sin(controlAngle2) * controlLen * 1.5;

      const newBranch: Branch = {
        startX: endX,
        startY: endY,
        length: branchLength,
        angle,
        lineWidth: branch.lineWidth * (depth === 0 ? 0.8 : 0.7), // 主干分支保持较粗
        children: [],
        growthProgress: 0,
        bloomProgress: 0,
        color: depth > 1 ? "#795548" : "#6D4C41", // 较细的分支颜色略浅
        controlPoints: {
          cp1x,
          cp1y,
          cp2x,
          cp2y,
        },
      };

      branch.children.push(newBranch);
      this.generateBranches(newBranch, depth + 1);
    }
  }

  private updateGrowth(elapsed: number): void {
    const growthProgress = Math.min(
      1,
      (elapsed - this.growthStartTime) / this.growthDuration
    );
    this.updateBranchGrowth(this.tree, growthProgress, 0);

    // Generate branches once when growth starts
    if (this.tree.children.length === 0 && growthProgress > 0) {
      this.generateBranches(this.tree);
    }
  }

  private updateBranchGrowth(
    branch: Branch,
    overallProgress: number,
    delay: number
  ): void {
    // Stagger growth based on depth
    const adjustedProgress = Math.max(0, overallProgress - delay);
    branch.growthProgress = Math.min(1, adjustedProgress * 1.5);

    // Update children with a delay
    branch.children.forEach((child, i) => {
      this.updateBranchGrowth(child, overallProgress, delay + 0.1 + i * 0.05);
    });
  }

  private updateBloom(elapsed: number): void {
    if (elapsed < this.bloomStartTime) return;

    const bloomProgress = Math.min(
      1,
      (elapsed - this.bloomStartTime) / this.bloomDuration
    );
    this.updateBranchBloom(this.tree, bloomProgress);
  }

  private updateBranchBloom(branch: Branch, progress: number): void {
    // Only leaf branches bloom
    if (branch.children.length === 0) {
      branch.bloomProgress = progress;
    }

    // Update children
    branch.children.forEach((child) => {
      this.updateBranchBloom(child, progress);
    });
  }

  private updateFallingPetals(elapsed: number): void {
    if (elapsed < this.fallingStartTime) return;

    // Add new petals occasionally - more frequently
    if (this.petals.length < this.maxPetals && Math.random() < 0.15) {
      this.addPetal();
    }

    // Update existing petals
    this.petals.forEach((petal) => {
      // Apply gravity and wind - more dynamic wind
      petal.speedY += 0.01;
      petal.speedX += (Math.random() - 0.5) * 0.03;

      // Move petal
      petal.x += petal.speedX;
      petal.y += petal.speedY;
      petal.rotation += petal.rotationSpeed;

      // Fade out as it falls - slower fading
      if (petal.y > this.height * 0.8) {
        petal.opacity -= 0.003;
      }
    });

    // Remove petals that are out of view or faded out
    this.petals = this.petals.filter(
      (petal) =>
        petal.y < this.height + 50 &&
        petal.x > -50 &&
        petal.x < this.width + 50 &&
        petal.opacity > 0
    );
  }

  private addPetal(): void {
    // Find a blooming branch to spawn petal from
    let spawnPoints: { x: number; y: number }[] = [];
    this.collectBloomingPoints(this.tree, spawnPoints);

    if (spawnPoints.length === 0) return;

    // Pick a random spawn point
    const spawn = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];

    // Create a new petal
    const petal: Petal = {
      x: spawn.x,
      y: spawn.y,
      size: 3 + Math.random() * 6, // Slightly larger petals
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.08, // Faster rotation
      speedX: (Math.random() - 0.5) * 0.8, // More horizontal movement
      speedY: 0.2 + Math.random() * 0.4, // Slightly faster falling
      opacity: 0.7 + Math.random() * 0.3,
      color:
        this.petalColors[Math.floor(Math.random() * this.petalColors.length)], // Random color from palette
    };

    this.petals.push(petal);
  }

  private collectBloomingPoints(
    branch: Branch,
    points: { x: number; y: number }[]
  ): void {
    const endX =
      branch.startX +
      Math.cos(branch.angle) * branch.length * branch.growthProgress;
    const endY =
      branch.startY +
      Math.sin(branch.angle) * branch.length * branch.growthProgress;

    // If this is a leaf branch and it's blooming, add it as a spawn point
    if (branch.children.length === 0 && branch.bloomProgress > 0) {
      points.push({ x: endX, y: endY });
    }

    // Check children
    branch.children.forEach((child) => {
      this.collectBloomingPoints(child, points);
    });
  }

  private drawTree(): void {
    this.drawBranch(this.tree);
  }

  private drawBranch(branch: Branch): void {
    if (branch.growthProgress <= 0) return;

    const endX =
      branch.startX +
      Math.cos(branch.angle) * branch.length * branch.growthProgress;
    const endY =
      branch.startY +
      Math.sin(branch.angle) * branch.length * branch.growthProgress;

    // 使用贝塞尔曲线绘制树干和分支，使其更圆润
    this.ctx.beginPath();
    this.ctx.moveTo(branch.startX, branch.startY);

    if (branch.controlPoints && branch.growthProgress > 0.1) {
      // 使用贝塞尔曲线
      const progress = branch.growthProgress;
      const cp1x =
        branch.startX + (branch.controlPoints.cp1x - branch.startX) * progress;
      const cp1y =
        branch.startY + (branch.controlPoints.cp1y - branch.startY) * progress;
      const cp2x =
        branch.startX + (branch.controlPoints.cp2x - branch.startX) * progress;
      const cp2y =
        branch.startY + (branch.controlPoints.cp2y - branch.startY) * progress;

      this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
    } else {
      // 对于主干或生长初期，使用直线
      this.ctx.lineTo(endX, endY);
    }

    // 设置线条末端为圆形，使连接处更圆润
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    // 为树干添加渐变色，使其更自然
    const gradient = this.ctx.createLinearGradient(
      branch.startX,
      branch.startY,
      endX,
      endY
    );
    gradient.addColorStop(0, branch.color);
    gradient.addColorStop(
      1,
      branch.children.length === 0 ? "#A1887F" : branch.color
    );

    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = branch.lineWidth;
    this.ctx.stroke();

    // 绘制花朵
    if (branch.children.length === 0 && branch.bloomProgress > 0) {
      this.drawBloom(
        endX,
        endY,
        branch.lineWidth * 4 * branch.bloomProgress, // 更大的花朵
        branch.bloomProgress
      );
    }

    // 绘制子分支
    branch.children.forEach((child) => {
      // 更新子分支的起始位置
      child.startX = endX;
      child.startY = endY;
      this.drawBranch(child);
    });
  }

  private drawBloom(
    x: number,
    y: number,
    size: number,
    progress: number
  ): void {
    // 增加花瓣数量，使花朵更丰满
    const numPetals = Math.floor(5 + Math.random() * 3);
    const petalLength = size * 2.0; // 更长的花瓣

    // 绘制多层花瓣，使花朵更丰满
    for (let layer = 0; layer < 2; layer++) {
      const layerSize = size * (1 - layer * 0.2);
      const layerOffset = (layer * Math.PI) / numPetals;

      for (let i = 0; i < numPetals; i++) {
        const angle = layerOffset + (i / numPetals) * Math.PI * 2;
        const petalX = x + Math.cos(angle) * layerSize * 0.3;
        const petalY = y + Math.sin(angle) * layerSize * 0.3;

        // 使用椭圆形花瓣
        this.ctx.beginPath();
        this.ctx.ellipse(
          petalX,
          petalY,
          petalLength * 0.6,
          layerSize * 0.5,
          angle,
          0,
          Math.PI * 2
        );

        // 创建渐变，使花瓣更自然
        const gradient = this.ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          petalLength
        );

        // 更接近图片中的粉色
        const alpha = progress * (1 - layer * 0.2);
        gradient.addColorStop(0, "rgba(255, 192, 203, " + alpha + ")");
        gradient.addColorStop(0.5, "rgba(255, 182, 193, " + alpha * 0.9 + ")");
        gradient.addColorStop(1, "rgba(255, 228, 225, " + alpha * 0.7 + ")");

        this.ctx.fillStyle = gradient;
        this.ctx.fill();
      }
    }

    // 绘制花蕊
    this.ctx.beginPath();
    this.ctx.arc(x, y, size * 0.25, 0, Math.PI * 2);
    this.ctx.fillStyle = "rgba(255, 223, 0, " + progress + ")";
    this.ctx.fill();
  }

  private drawPetals(): void {
    this.petals.forEach((petal) => {
      this.ctx.save();
      this.ctx.translate(petal.x, petal.y);
      this.ctx.rotate(petal.rotation);
      this.ctx.globalAlpha = petal.opacity;

      // 绘制更接近真实樱花的花瓣形状
      this.ctx.beginPath();

      // 使用更圆润的花瓣形状，顶部有小凹槽
      this.ctx.moveTo(0, -petal.size * 0.2);
      this.ctx.bezierCurveTo(
        petal.size * 0.8,
        -petal.size * 0.8,
        petal.size * 1.5,
        -petal.size * 0.3,
        petal.size * 1.0,
        petal.size * 0.5
      );
      this.ctx.bezierCurveTo(
        petal.size * 0.5,
        petal.size * 1.0,
        -petal.size * 0.5,
        petal.size * 1.0,
        -petal.size * 1.0,
        petal.size * 0.5
      );
      this.ctx.bezierCurveTo(
        -petal.size * 1.5,
        -petal.size * 0.3,
        -petal.size * 0.8,
        -petal.size * 0.8,
        0,
        -petal.size * 0.2
      );

      // 创建渐变，使花瓣更自然
      const gradient = this.ctx.createRadialGradient(
        0,
        0,
        0,
        0,
        0,
        petal.size * 1.5
      );
      gradient.addColorStop(0, petal.color);
      gradient.addColorStop(1, this.adjustColor(petal.color, -20, 20, 20, 0));

      this.ctx.fillStyle = gradient;
      this.ctx.fill();

      this.ctx.restore();
    });
  }

  // 辅助函数：调整颜色
  private adjustColor(
    color: string,
    rDelta: number,
    gDelta: number,
    bDelta: number,
    aDelta: number
  ): string {
    // 简单的颜色调整，使花瓣边缘更浅
    if (color.startsWith("#")) {
      // 将十六进制转换为 rgba
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${Math.min(255, r + rDelta)}, ${Math.min(255, g + gDelta)}, ${Math.min(255, b + bDelta)}, ${1 + aDelta})`;
    }
    return color;
  }

  private animate = (timestamp: number = 0): void => {
    if (this.isDestroyed) return;

    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update animation state
    this.updateGrowth(timestamp);
    this.updateBloom(timestamp);
    this.updateFallingPetals(timestamp);

    // Draw everything
    this.drawTree();
    this.drawPetals();

    // Continue animation
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  public destroy(): void {
    this.isDestroyed = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener("resize", this.handleResize);
  }
}
