
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, Apple, XCircle, KeyRound } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [showKeypad, setShowKeypad] = useState(false);
  const [forgotPinOpen, setForgotPinOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login for demo purposes
    setTimeout(() => {
      toast({
        title: "Login successful",
        description: "Welcome to Credit Line Tracker!",
      });
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Demo Login successful",
        description: "Welcome to Credit Line Tracker demo!",
      });
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };

  const handlePinSubmit = () => {
    if (pin.length === 4) {
      setIsLoading(true);
      
      setTimeout(() => {
        toast({
          title: "PIN Login successful",
          description: "Welcome to Credit Line Tracker!",
        });
        setIsLoading(false);
        navigate("/");
      }, 1000);
    } else {
      toast({
        title: "Invalid PIN",
        description: "Please enter a 4-digit PIN",
        variant: "destructive",
      });
    }
  };

  const handleKeypadClick = (digit: string) => {
    if (digit === "clear") {
      setPin("");
    } else if (digit === "backspace") {
      setPin(prev => prev.slice(0, -1));
    } else if (pin.length < 4) {
      setPin(prev => prev + digit);
    }
  };

  const handleForgotPin = () => {
    setForgotPinOpen(false);
    toast({
      title: "Reset link sent",
      description: "Check your email for PIN reset instructions",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="glassmorphism w-full max-w-sm p-6 rounded-2xl scale-in">
        <div className="flex flex-col items-center mb-6">
          <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 animate-pulse">
            {showKeypad ? (
              <KeyRound className="h-8 w-8 text-primary" />
            ) : (
              <div className="flex items-center space-x-3">
                <ShoppingCart className="h-8 w-8 text-primary" />
                <Apple className="h-8 w-8 text-secondary" />
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold text-center">Credit Line Tracker</h1>
          <p className="text-muted-foreground text-center mt-2 text-sm">
            {showKeypad ? "Enter your PIN to login" : "Login to manage customer credit"}
          </p>
        </div>

        {showKeypad ? (
          <div className="space-y-6 slide-up">
            <div className="flex justify-center mb-4">
              <div className="flex space-x-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-3 w-3 rounded-full ${
                      pin.length > i ? "bg-primary" : "bg-muted"
                    } transition-colors duration-200`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mx-auto max-w-[220px]">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                <button
                  key={digit}
                  onClick={() => handleKeypadClick(digit.toString())}
                  className="h-16 w-16 rounded-full bg-background/50 hover:bg-background/80 text-xl font-medium flex items-center justify-center transition-colors touch-ripple active:scale-95"
                  aria-label={`Number ${digit}`}
                >
                  {digit}
                </button>
              ))}
              <button
                onClick={() => handleKeypadClick("clear")}
                className="h-16 w-16 rounded-full bg-destructive/20 hover:bg-destructive/40 text-destructive text-xs font-medium flex items-center justify-center transition-colors touch-ripple active:scale-95"
                aria-label="Clear PIN"
              >
                CLEAR
              </button>
              <button
                onClick={() => handleKeypadClick("0")}
                className="h-16 w-16 rounded-full bg-background/50 hover:bg-background/80 text-xl font-medium flex items-center justify-center transition-colors touch-ripple active:scale-95"
                aria-label="Number 0"
              >
                0
              </button>
              <button
                onClick={() => handleKeypadClick("backspace")}
                className="h-16 w-16 rounded-full bg-background/50 hover:bg-background/80 flex items-center justify-center transition-colors touch-ripple active:scale-95"
                aria-label="Backspace"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <div className="pt-4 space-y-3">
              <Button 
                onClick={handlePinSubmit} 
                className="w-full touch-ripple"
                disabled={pin.length !== 4 || isLoading}
                aria-label="Login with PIN"
              >
                {isLoading ? "Logging in..." : "Login with PIN"}
              </Button>
              
              <div className="flex justify-between text-sm">
                <button 
                  onClick={() => setShowKeypad(false)} 
                  className="text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded"
                  aria-label="Switch to username login"
                >
                  Use Username
                </button>
                <button 
                  onClick={() => setForgotPinOpen(true)}
                  className="text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded"
                  aria-label="Forgot PIN"
                >
                  Forgot PIN?
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={handleLogin} className="space-y-5 slide-up">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Username
                </label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-primary"
                  required
                  aria-required="true"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-primary"
                  required
                  aria-required="true"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full touch-ripple" 
                disabled={isLoading}
                aria-label="Login with username and password"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="mt-4 pt-4 border-t border-border/50 space-y-3 slide-up" style={{ animationDelay: "0.1s" }}>
              <Button 
                variant="secondary" 
                className="w-full touch-ripple" 
                onClick={handleDemoLogin}
                disabled={isLoading}
                aria-label="Demo login"
              >
                Demo Login
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full touch-ripple" 
                onClick={() => setShowKeypad(true)}
                aria-label="Switch to PIN login"
              >
                Login with PIN
              </Button>
            </div>
          </>
        )}
      </div>

      <Dialog open={forgotPinOpen} onOpenChange={setForgotPinOpen}>
        <DialogContent className="sm:max-w-md scale-in">
          <DialogHeader>
            <DialogTitle>Forgot PIN</DialogTitle>
            <DialogDescription>
              Enter your email address to receive a PIN reset link.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                className="bg-background/50 border-border/50"
                aria-required="true"
              />
            </div>
            <Button 
              onClick={handleForgotPin} 
              className="w-full touch-ripple"
              aria-label="Send reset link"
            >
              Send Reset Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
