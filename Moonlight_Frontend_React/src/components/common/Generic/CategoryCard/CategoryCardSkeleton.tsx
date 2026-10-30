import { Card } from "../Card";

export function CategoryCardSkeleton() {
    return(
        <>
            <Card className="h-64 w-full relative overflow-hidden animate-pulse">
                <div className="bg-gray-700 h-full w-full object-cover rounded-md"></div>
                <div className="absolute inset-0 transition-all duration-300 flex items-center justify-center rounded-md">
                    <p className="text-white bg-base-soft font-bold text-xl transition-all duration-300 rounded-md p-2">
                    ...
                    </p>
                </div>
            </Card>
        </>
    )
}
