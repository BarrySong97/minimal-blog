import { FC } from "react";
import { Metadata } from "next";
import { friendLinkService } from "@/service/friend-links";
import FriendLinksList from "@/components/friends/FriendLinksList";

export const metadata: Metadata = {
  title: "Friends Links",
  description: "My friend links and recommended websites",
};

interface FriendsPageProps {
  params: Promise<{
    lng: string;
  }>;
}

const FriendsPage: FC<FriendsPageProps> = async ({ params }) => {
  const { lng } = await params;

  try {
    const data = await friendLinkService.getActiveFriendLinks();

    return (
      <div className="mx-auto container px-6 2xl:px-0 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Friend Link</h1>
          <p className="text-gray-600 dark:text-gray-300">
            My friend links and recommended websites
          </p>
        </div>
        <FriendLinksList friendLinks={data?.docs || []} lng={lng} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch friend links:", error);
    return (
      <div className="w-full px-4 py-8 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Friend Link</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Failed to fetch friend links
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default FriendsPage;
