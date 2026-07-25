import Image from 'next/image';
import Link from 'next/link';
import SearchInput from '../components/SearchInput';

interface GithubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  company: string | null;
  blog: string | null;
  created_at: string;
}

interface PageProps {
  params: Promise<{ username?: string[] }>;
}

async function fetchProfile(username: string): Promise<GithubProfile> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/backend';
  const url = username
    ? `${baseUrl}/user/${username}`
    : `${baseUrl}/user`;

  const res = await fetch(url, {
    cache: 'no-store',
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Could not retrieve user data');
  }

  return res.json();
}

export default async function Page({ params }: PageProps) {
  const { username } = await params;
  const targetUsername = username?.[0] || '';

  let profile: GithubProfile | null = null;
  let errorMsg: string | null = null;

  try {
    profile = await fetchProfile(targetUsername);
  } catch (error) {
    errorMsg = error instanceof Error ? error.message : 'Something went wrong';
  }

  const formattedDate = profile
    ? new Date(profile.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : '';

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 py-12 px-4 sm:px-6 md:px-8">
      <main className="w-full max-w-xl flex flex-col items-center gap-10">

        {/* Header */}
        <div className="text-center flex flex-col items-center gap-1.5">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            GitHub Profile Reto
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Busca y explora perfiles de GitHub
          </p>
        </div>

        {/* Search */}
        <SearchInput initialUsername={targetUsername} />

        {/* Profile or Error */}
        {errorMsg || !profile ? (
          <div className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 flex flex-col items-center text-center gap-4">
            <div className="h-11 w-11 rounded-full bg-red-50 dark:bg-red-950/40 flex items-center justify-center text-red-600 dark:text-red-400 font-semibold text-base">
              !
            </div>
            <div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {errorMsg === 'User not found' ? 'Profile Not Found' : 'Connection Error'}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm">
                {errorMsg === 'User not found'
                  ? `El usuario de GitHub "${targetUsername}" no existe. Por favor, verifica la ortografía.`
                  : 'No se pudo conectar al servidor. Verifica que el backend de NestJS esté funcionando en el puerto 3001.'}
              </p>
            </div>
            {targetUsername && (
              <Link
                href="/"
                className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Regresar al perfil predeterminado
              </Link>
            )}
          </div>
        ) : (
          <div className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 flex flex-col gap-0">

            {/* Identity: Avatar + Name + Bio */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left pb-6 border-b border-zinc-100 dark:border-zinc-800">
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0">
                <img
                  src={profile.avatar_url}
                  alt={`${profile.name || profile.login}'s avatar`}
                  sizes="(max-width: 768px) 80px, 96px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center gap-1.5 min-w-0">
                <div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white leading-tight">
                    {profile.name || profile.login}
                  </h2>
                  <Link
                    href={profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline mt-0.5 inline-block"
                  >
                    @{profile.login}
                  </Link>
                </div>
                {profile.bio ? (
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-md">
                    {profile.bio}
                  </p>
                ) : (
                  <p className="text-sm text-zinc-400 dark:text-zinc-500 italic">
                    Este usuario no tiene biografía.
                  </p>
                )}
              </div>
            </div>

            {/* Metrics: horizontal strip with separators */}
            <div className="flex items-center justify-between py-5 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex-1 flex flex-col items-center gap-0.5">
                <span className="text-2xl font-bold text-zinc-900 dark:text-white tabular-nums">
                  {profile.public_repos}
                </span>
                <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                  Repositorios
                </span>
              </div>
              <div className="w-px h-8 bg-zinc-100 dark:bg-zinc-800" />
              <div className="flex-1 flex flex-col items-center gap-0.5">
                <span className="text-2xl font-bold text-zinc-900 dark:text-white tabular-nums">
                  {profile.followers}
                </span>
                <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                  Seguidores
                </span>
              </div>
              <div className="w-px h-8 bg-zinc-100 dark:bg-zinc-800" />
              <div className="flex-1 flex flex-col items-center gap-0.5">
                <span className="text-2xl font-bold text-zinc-900 dark:text-white tabular-nums">
                  {profile.following}
                </span>
                <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                  Siguiendo
                </span>
              </div>
            </div>

            {/* Info details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 py-5 text-sm text-zinc-600 dark:text-zinc-300">
              {profile.location && (
                <div className="flex items-center gap-2.5">
                  <svg className="h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate">{profile.location}</span>
                </div>
              )}
              {profile.company && (
                <div className="flex items-center gap-2.5">
                  <svg className="h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="truncate">{profile.company}</span>
                </div>
              )}
              {profile.blog && (
                <div className="flex items-center gap-2.5">
                  <svg className="h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <Link
                    href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline truncate"
                  >
                    {profile.blog}
                  </Link>
                </div>
              )}
              <div className="flex items-center gap-2.5">
                <svg className="h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Se unió el {formattedDate}</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-medium text-sm transition-colors duration-150 flex items-center justify-center gap-2"
            >
              <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Ir a GitHub
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
