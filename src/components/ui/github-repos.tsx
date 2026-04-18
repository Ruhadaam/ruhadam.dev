"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink } from "lucide-react";
import {
  githubService,
  GithubRepo,
  GithubUser,
} from "@/src/services/githubService";
import { Card } from "@/src/components/ui/card";
import { Heading } from "@/src/components/ui/heading";
import { Text } from "@/src/components/ui/text";

interface GithubReposProps {
  username: string;
}

const RepoSkeleton = () => (
  // Skeleton için de glassmorphism uyguladık
  <div className="w-full bg-white/5 dark:bg-black/10 border border-white/10 dark:border-white/5 backdrop-blur-lg rounded-2xl p-5 animate-pulse shadow-xl">
    <div className="flex justify-between items-start mb-3">
      <div className="h-5 w-2/5 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-lg" />
      <div className="h-4 w-4 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-md" />
    </div>

    <div className="flex gap-4">
      <div className="h-3 w-12 bg-zinc-200/20 dark:bg-zinc-800/20 rounded-md" />
      <div className="h-3 w-8 bg-zinc-200/20 dark:bg-zinc-800/20 rounded-md" />
      <div className="h-3 w-8 bg-zinc-200/20 dark:bg-zinc-800/20 rounded-md" />
    </div>
  </div>
);

const ProfileSkeleton = () => (
  <div className="flex items-center gap-6 mb-2 animate-pulse self-start">
    <div className="w-20 h-20 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-2xl" />
    <div className="space-y-3">
      <div className="h-8 w-40 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-xl" />
      <div className="h-3 w-20 bg-zinc-200/30 dark:bg-zinc-800/30 rounded-lg" />
    </div>
  </div>
);

export const GithubRepos = ({ username }: GithubReposProps) => {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Önce cache kontrolü yapıp yükleme ekranını hızlıca geçebiliriz
    const cachedUser = githubService.getCachedUser(username);
    const cachedRepos = githubService.getCachedRepos(username);

    if (cachedUser && cachedRepos) {
      setUser(cachedUser);
      setRepos(cachedRepos);
      setLoading(false);
    }

    const fetchData = async () => {
      try {
        const [userData, reposData] = await Promise.all([
          githubService.getUser(username),
          githubService.getRepos(username),
        ]);
        setUser(userData);
        setRepos(reposData);
      } catch (error) {
        console.error("Github fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username]);

  if (loading) {
    return (
      <div className="w-full max-w-2xl px-6 lg:px-8 py-10 flex flex-col gap-8 self-start ml-0 lg:ml-4">
        <ProfileSkeleton />
        <div className="grid grid-cols-1 gap-3 w-full">
          {[...Array(6)].map((_, i) => (
            <RepoSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl px-6 lg:px-8 py-10 flex flex-col gap-8 self-start ml-0 lg:ml-4 text-left">
      {user && (
        <motion.a
          href={`https://github.com/${user.login}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-6 mb-2 group/profile cursor-pointer self-start"
        >
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 group-hover/profile:ring-blue-500/50 transition-all duration-500">
            <Image
              src={user.avatar_url}
              alt={user.name || user.login}
              fill
              className="object-cover group-hover/profile:scale-110 transition-transform duration-500"
              sizes="80px"
            />
          </div>
          <div className="flex flex-col items-start">
            <Heading
              delay={0.1}
              className="text-2xl md:text-3xl mb-0.5 group-hover/profile:text-blue-500 transition-colors"
              animateLetters={false}
            >
              {user.name || user.login}
            </Heading>
            <Text
              delay={0.2}
              className="text-[0.6rem] uppercase tracking-[0.2em] font-bold text-blue-600 dark:text-blue-400 opacity-80 group-hover/profile:opacity-100 transition-opacity"
            >
              @{user.login}
            </Text>
          </div>
        </motion.a>
      )}

      <div className="grid grid-cols-1 gap-3">
        {repos
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 10) // Sadece en popüler 10 projeyi gösteriyoruz (hız için)
          .map((repo, idx) => (
            <Card
              key={repo.id}
              delay={idx * 0.03} // Gecikmeyi ciddi oranda azalttık
              className="group p-5 cursor-pointer transition-all duration-300
                       
                       /* Temel Glass Efekti */
                       bg-white/10 dark:bg-black/20           /* Çok hafif şeffaf arka plan */
                       backdrop-blur-lg                        /* Güçlü bulanıklık */
                       
                       /* İnce Işık Kırılması Kenarlığı */
                       border border-white/20 dark:border-white/10
                       
                       /* Yumuşak Gölge */
                       shadow-lg shadow-black/5
                       
                       /* Hover Durumu */
                       hover:bg-white/15 dark:hover:bg-black/30  /* Hafif aydınlanma */
                       hover:-translate-y-1.5 hover:scale-[1.01]
                       hover:shadow-2xl hover:shadow-blue-500/15 /* Mavi parıltılı gölge */
                       hover:border-blue-500/30                  /* Mavi kenarlık vurgusu */"
              onClick={() => window.open(repo.html_url, "_blank")}
            >
              <div className="flex justify-between items-start mb-2 group/title">
                <Heading
                  className="text-base group-hover:text-blue-500/80 transition-colors"
                  animateLetters={false}
                >
                  {repo.name}
                </Heading>
                <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
              </div>

              <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400/80 transition-colors group-hover:text-zinc-700 dark:group-hover:text-zinc-200">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1.5 hover:text-blue-500/80 transition-colors">
                  <Star className="w-3 h-3" />
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1.5 hover:text-blue-500/80 transition-colors">
                  <GitFork className="w-3 h-3" />
                  {repo.forks_count}
                </span>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};
