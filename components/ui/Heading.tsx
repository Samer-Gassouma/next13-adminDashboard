interface HeadingProps {
    title: string;
    description: string;
}

export const Heading: React.FC<HeadingProps> = ({
    title,
    description
}) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex-1">
                <h2 className="text-3xl  tracking-tight leading-6 font-medium dark:text-white text-gray-900">{title}</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{description}</p>
            </div>
        </div>
    )
    }
