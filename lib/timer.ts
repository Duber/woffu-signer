class Timer {
  private random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async randomDelay() {
    return this.delay(this.random(1000, 5000));
  }
}

export default new Timer();
