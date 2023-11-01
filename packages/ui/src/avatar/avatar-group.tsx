import React from "react";
// ui
import { Tooltip } from "../tooltip";
// types
import { TAvatarSize, getSizeInfo, isAValidNumber } from "./avatar";

type Props = {
  /**
   * The children of the avatar group.
   * These should ideally should be `Avatar` components
   */
  children: React.ReactNode;
  /**
   * The maximum number of avatars to display.
   * If the number of children exceeds this value, the additional avatars will be replaced by a count of the remaining avatars.
   * @default 2
   */
  max?: number;
  /**
   * Whether to show the tooltip or not
   * @default true
   */
  showTooltip?: boolean;
  /**
   * The size of the avatars
   * Possible values: "sm", "md", "base", "lg"
   * @default "md"
   */
  size?: TAvatarSize;
};

export const AvatarGroup: React.FC<Props> = (props) => {
  const { children, max = 2, showTooltip = true, size = "md" } = props;

  // calculate total length of avatars inside the group
  const totalAvatars = React.Children.toArray(children).length;

  // slice the children to the maximum number of avatars
  const avatars = React.Children.toArray(children).slice(0, max);

  // assign the necessary props from the AvatarGroup component to the Avatar components
  const avatarsWithUpdatedProps = avatars.map((avatar) => {
    const updatedProps: Partial<Props> = {
      showTooltip,
      size,
    };

    return React.cloneElement(avatar as React.ReactElement, updatedProps);
  });

  // get size details based on the size prop
  const sizeInfo = getSizeInfo(size);

  return (
    <div className={`flex ${sizeInfo.spacing}`}>
      {avatarsWithUpdatedProps.map((avatar, index) => (
        <div key={index} className="ring-1 ring-custom-border-200 rounded-full">
          {avatar}
        </div>
      ))}
      {max < totalAvatars && (
        <Tooltip
          tooltipContent={`${totalAvatars} total`}
          disabled={!showTooltip}
        >
          <div
            className={`${
              !isAValidNumber(size) ? sizeInfo.avatarSize : ""
            } ring-1 ring-custom-border-200 bg-custom-primary-500 text-white rounded-full grid place-items-center text-[9px]`}
            style={
              isAValidNumber(size)
                ? {
                    width: `${size}px`,
                    height: `${size}px`,
                  }
                : {}
            }
          >
            +{totalAvatars - max}
          </div>
        </Tooltip>
      )}
    </div>
  );
};