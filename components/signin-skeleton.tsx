import { Card, CardContent, CardHeader } from '@/components/ui/card';

const SignInSkeleton = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="flex items-center">
            <div className="h-px bg-gray-200 flex-grow"></div>
            <div className="px-2 text-sm text-gray-400">or</div>
            <div className="h-px bg-gray-200 flex-grow"></div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="h-10 bg-primary/20 rounded"></div>
        </CardContent>
        <div className="p-6 border-t">
          <div className="flex justify-center items-center space-x-2">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/6"></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignInSkeleton;