import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type PartSearchResultCardProps = {
  articleNo: string;
  countArticles: number;
  children: React.ReactNode;
  dataFound: boolean;
  type?: "api" | "db";
};

const PartSearchResultCard = ({
  articleNo,
  countArticles,
  children,
  dataFound,
  type = "api",
}: PartSearchResultCardProps) => {
  return (
    <>
      {dataFound ? (
        <div className="flex size-full flex-col items-center gap-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                Search Result{`${type === "db" ? " (STDP)" : ""}`}:&nbsp;
                {articleNo}
              </CardTitle>
              <CardDescription>
                Total Found&nbsp;{countArticles}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex size-full flex-col gap-4">
              <>{children}</>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>no data available</div>
      )}
    </>
  );
};

export default PartSearchResultCard;
