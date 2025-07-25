import { io, type Socket } from "socket.io-client";

class SocketManager {
  private socket: Socket | null = null;
  private url: string;
  private options: any;
  private authToken: string | null = null;

  constructor(
    url: string = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001",
    options = {}
  ) {
    this.url = url;
    this.options = {
      autoConnect: false,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      timeout: 20000,
      ...options,
    };
  }

  setAuthToken(token: string | null): void {
    this.authToken = token;

    // Update existing socket auth if connected
    if (this.socket) {
      if (token) {
        this.socket.auth = { token };
        // Reconnect with new token
        if (this.socket.connected) {
          this.socket.disconnect().connect();
        }
      } else {
        delete (this.socket as any).auth;
      }
    }
  }

  connect(): Socket {
    if (!this.socket) {
      const auth: any = {};
      if (this.authToken) {
        auth.token = `Bearer ${this.authToken}`;
      }

      const extraHeaders: any = {};
      if (this.authToken) {
        extraHeaders.Authorization = `Bearer ${this.authToken}`;
      }

      this.socket = io(this.url, {
        ...this.options,
        transports: ["websocket"],
        auth,
        extraHeaders,
        // transportOptions: {
        //   polling: {
        //     extraHeaders,
        //   },
        // },
      });

      this.socket.on("connect", () => {
        // console.log("Socket connected:", this.socket?.id);
        // console.log("Auth token sent:", this.authToken ? "✅" : "❌");
      });

      this.socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
      });

      this.socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        // Handle specific NestJS auth errors
        if (
          error.message === "Token not found" ||
          error.message === "Invalid token"
        ) {
          console.error("Authentication failed - check your token");
        }
      });

      // Handle NestJS WebSocket exceptions
      this.socket.on("exception", (error) => {
        console.error("WebSocket exception:", error);
        if (
          error.message === "Token not found" ||
          error.message === "Invalid token"
        ) {
          console.error("Authentication error from server");
        }
      });
    }

    if (!this.socket.connected) {
      this.socket.connect();
    }

    return this.socket;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  getAuthToken(): string | null {
    return this.authToken;
  }
}

// Singleton instance
export const socketManager = new SocketManager();
export const getSocket = () => socketManager.connect();
