/**
 * Performance monitoring and optimization utilities
 */

/**
 * Measure FPS (Frames Per Second)
 * Useful for monitoring animation performance
 */
export class FPSMonitor {
  private frames: number[] = [];
  private lastTime = performance.now();
  private rafId: number | null = null;

  start(callback?: (fps: number) => void) {
    const measure = () => {
      const now = performance.now();
      const delta = now - this.lastTime;
      this.lastTime = now;

      const fps = 1000 / delta;
      this.frames.push(fps);

      // Keep only last 60 frames (1 second at 60fps)
      if (this.frames.length > 60) {
        this.frames.shift();
      }

      // Calculate average FPS
      const avgFps =
        this.frames.reduce((sum, f) => sum + f, 0) / this.frames.length;

      if (callback) {
        callback(avgFps);
      }

      this.rafId = requestAnimationFrame(measure);
    };

    this.rafId = requestAnimationFrame(measure);
  }

  stop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  getAverageFPS(): number {
    if (this.frames.length === 0) return 0;
    return this.frames.reduce((sum, f) => sum + f, 0) / this.frames.length;
  }
}

/**
 * Debounce function to limit execution rate
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit execution frequency
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if device is low-end based on hardware capabilities
 */
export function isLowEndDevice(): boolean {
  // Check CPU cores
  const hardwareConcurrency = navigator.hardwareConcurrency || 2;
  if (hardwareConcurrency <= 4) return true;

  // Check device memory (Chrome only)
  const deviceMemory = (navigator as any).deviceMemory;
  if (deviceMemory && deviceMemory <= 4) return true;

  // Check connection speed
  const connection = (navigator as any).connection;
  if (connection && connection.effectiveType) {
    const slowConnections = ['slow-2g', '2g', '3g'];
    if (slowConnections.includes(connection.effectiveType)) return true;
  }

  return false;
}

/**
 * Get optimal quality setting based on device and viewport
 */
export function getOptimalQuality(): 'low' | 'medium' | 'high' {
  const isMobile = window.innerWidth < 768;
  const lowEnd = isLowEndDevice();

  if (isMobile || lowEnd) return 'low';
  if (window.innerWidth >= 1920 && !lowEnd) return 'high';
  return 'medium';
}

/**
 * Performance marker for measuring operations
 */
export class PerformanceMarker {
  private marks: Map<string, number> = new Map();

  start(name: string) {
    this.marks.set(name, performance.now());
  }

  end(name: string): number {
    const startTime = this.marks.get(name);
    if (!startTime) {
      console.warn(`No start mark found for: ${name}`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.marks.delete(name);

    return duration;
  }

  measure(name: string, callback: () => void) {
    this.start(name);
    callback();
    const duration = this.end(name);
    console.log(`${name} took ${duration.toFixed(2)}ms`);
    return duration;
  }
}

/**
 * Memory manager for Three.js objects
 */
export class ThreeMemoryManager {
  private disposables: Array<{ dispose: () => void }> = [];

  register<T extends { dispose: () => void }>(object: T): T {
    this.disposables.push(object);
    return object;
  }

  dispose() {
    this.disposables.forEach(obj => obj.dispose());
    this.disposables = [];
  }

  disposeObject<T extends { dispose: () => void }>(object: T) {
    object.dispose();
    this.disposables = this.disposables.filter(obj => obj !== object);
  }
}
