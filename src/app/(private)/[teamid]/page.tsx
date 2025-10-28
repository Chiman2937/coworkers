interface Props {
  params: Promise<{
    teamid: string;
  }>;
}

const TeamIdPage = async ({ params }: Props) => {
  const { teamid } = await params;
  console.log(teamid);
};

export default TeamIdPage;
