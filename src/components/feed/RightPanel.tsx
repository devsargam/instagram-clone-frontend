import { useSuggestedPeople } from '@/hooks/feed/useSuggestedPeople';
import { Button } from '../common';
import { SuggestedPerson } from '../common/SuggestedPerson';
import { ISuggestedUser } from '@/interfaces';
import { useRecoilValue } from 'recoil';
import { loggedInUserProfileState } from '@/store/atoms/profile';

export function RightPanel() {
  const { suggestedUsers } = useSuggestedPeople();
  const loggedInUser = useRecoilValue(loggedInUserProfileState);

  return (
    <section className="w-[22rem] hidden lg:block space-y-4 pt-4 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-full overflow-hidden w-16 h-16 cursor-pointer">
            <img
              className="w-full"
              alt={`${loggedInUser.username} photo`}
              src={loggedInUser.displayPictureUrl}
            />
          </div>
          <div>
            <h2 className="font-semibold text-md">{loggedInUser.username}</h2>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="font-semibold opacity-50">Suggestions For You</h1>
        <Button blacked>See All</Button>
      </div>

      <div className="space-y-4">
        {suggestedUsers.map((user: ISuggestedUser) => (
          <SuggestedPerson key={user.id} person={user} />
        ))}
      </div>
    </section>
  );
}
