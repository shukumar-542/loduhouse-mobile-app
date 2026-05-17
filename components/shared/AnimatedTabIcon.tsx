import { useEffect, useRef } from "react";
import { Animated } from "react-native";

type Props = {
  icon: any;
  color: string;
  size: number;
  focused: boolean;
};

export default function AnimatedTabIcon({ icon: Icon, color, size, focused }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.2 : 1,
      useNativeDriver: true,
      friction: 4,
      tension: 100,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Icon color={color} size={size} />
    </Animated.View>
  );
}