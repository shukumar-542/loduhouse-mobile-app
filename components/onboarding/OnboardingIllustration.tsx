import React from "react";
import { View, Image, Dimensions } from "react-native";
import { SvgProps } from "react-native-svg";

const { width, height } = Dimensions.get("window");

interface IllustrationProps {
  SvgComponent?: React.FC<SvgProps>;
  imageSrc?: any;
}

const OnboardingIllustration: React.FC<IllustrationProps> = ({
  SvgComponent,
  imageSrc,
}) => {
  return (
    <View className="w-full items-center justify-center px-8">
      <View
        style={{
          width: width * 0.85,
          height: height * 0.45,
        }}
        className="items-center justify-center"
      >
        {SvgComponent ? (
          <SvgComponent
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        ) : (
          <Image
            source={imageSrc}
            style={{
              width: "100%",
              height: "100%",
            }}
            resizeMode="contain"
          />
        )}
      </View>
    </View>
  );
};

export default OnboardingIllustration;
