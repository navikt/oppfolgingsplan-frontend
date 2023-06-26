import { Button, Heading, Skeleton } from "@navikt/ds-react";

export const OPSkeleton = () => {
  return (
    <div id="ny-oppfolgingsplan-skeleton">
      <Button as={Skeleton} size={"medium"}>
        Lag en ny oppfølgingsplan
      </Button>

      <br />

      <Heading as={Skeleton} size="large" className="mb-4">
        Aktiv oppfølgingsplan
      </Heading>

      <Skeleton variant="rectangle" width="100%" className="mb-8">
        <div>TTTTTTTTTTTTTTTTTTTTTTTT</div>
        <div>TTTTTTTTTTTTTTTTTTTTTTTT</div>
        <div>TTTTTTTTTTTTTTTTTTTTTTTT</div>
        <div>TTTTTTTTTTTTTTTTTTTTTTTT</div>
      </Skeleton>
    </div>
  );
};
