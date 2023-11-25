import { ISuggestedUser } from '@/interfaces';
import { Button } from '.';
import { useFollow } from '@/hooks/follow/useFollow';

interface IProps {
  person: ISuggestedUser;
}

export const SuggestedPerson = ({ person }: IProps) => {
  const { followFn } = useFollow();

  const handleClick = () => {
    followFn(person.username);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <div className="rounded-full overflow-hidden w-8 h-8">
          <img
            className="w-full"
            src={person.displayPictureUrl}
            alt={person.username}
          />
        </div>

        <div className="text-xs">
          <h3 className="font-semibold text-sm">{person.username}</h3>
        </div>
      </div>

      <Button onClick={handleClick}>Follow</Button>
    </div>
  );
};
