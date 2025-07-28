interface UserSession {
  userId: string;
  displayName: string;
  sessionStart: number;
  isLocked: boolean;
}

class UserManager {
  private static instance: UserManager;
  private userSession: UserSession | null = null;

  private constructor() {}

  static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }

  private generateUserId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `user_${timestamp}_${random}`;
  }

  private generateDefaultName(userId: string): string {
    const shortId = userId.split('_')[2] || 'anon';
    return `Usuario_${shortId}`;
  }

  initializeUser(): UserSession {
    const existing = localStorage.getItem('chatUserSession');
    if (existing) {
      try {
        this.userSession = JSON.parse(existing);
        console.log('🔄 Sesión de usuario restaurada:', this.userSession.userId);
        return this.userSession;
      } catch {
        console.warn('⚠️ Error restaurando sesión, creando nueva');
      }
    }
    const userId = this.generateUserId();
    this.userSession = {
      userId,
      displayName: this.generateDefaultName(userId),
      sessionStart: Date.now(),
      isLocked: false,
    };
    this.saveSession();
    console.log('✨ Nueva sesión de usuario creada:', userId);
    return this.userSession;
  }

  updateDisplayName(name: string): void {
    if (this.userSession) {
      this.userSession.displayName = name;
      this.saveSession();
    }
  }

  lockName(): void {
    if (this.userSession) {
      this.userSession.isLocked = true;
      this.saveSession();
    }
  }

  unlockName(): void {
    if (this.userSession) {
      this.userSession.isLocked = false;
      this.saveSession();
    }
  }

  private saveSession(): void {
    if (this.userSession) {
      localStorage.setItem('chatUserSession', JSON.stringify(this.userSession));
    }
  }

  getCurrentUser(): UserSession | null {
    return this.userSession;
  }

  getUserId(): string {
    return this.userSession?.userId || 'anonymous';
  }

  getDisplayName(): string {
    return this.userSession?.displayName || 'Anónimo';
  }

  isNameLocked(): boolean {
    return this.userSession?.isLocked || false;
  }

  resetSession(): void {
    localStorage.removeItem('chatUserSession');
    this.userSession = null;
  }
}

export default UserManager;
export type { UserSession };
