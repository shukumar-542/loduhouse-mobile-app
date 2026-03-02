import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageStyle,
  StyleProp,
} from "react-native";
import { SvgProps } from "react-native-svg";
import SvgIcon from "./svgIcon";

interface ImageNavigatorProps {
  imageSource: string | React.FC<SvgProps> | undefined;
  onPress: () => void;
  style?: StyleProp<ImageStyle>; // ✅ optional custom styles
}

const ImageNavigator: React.FC<ImageNavigatorProps> = ({
  imageSource,
  onPress,
  style, // optional custom styles
}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        {typeof imageSource === "string" ? (
          <Image source={{ uri: imageSource }} style={[styles.image, style]} />
        ) : (
          <SvgIcon SvgComponent={imageSource} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 25, // default circular
    borderWidth: 0, // default no border
    borderColor: "transparent",
  },
});

export default ImageNavigator;
