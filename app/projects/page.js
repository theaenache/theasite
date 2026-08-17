import ProjectsClient from '@/components/ProjectsClient';

export default async function ProjectsPage({ searchParams }) {
  const { open } = await searchParams;
  return <ProjectsClient openId={open} />;
}
