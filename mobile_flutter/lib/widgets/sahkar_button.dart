import 'package:flutter/material.dart';
import '../theme/sds_light_theme.dart';

class SahkarButton extends StatelessWidget {
  final String label;
  final VoidCallback onPressed;
  final bool isSaffron;
  final IconData? icon;

  const SahkarButton({
    Key? key,
    required this.label,
    required this.onPressed,
    this.isSaffron = false,
    this.icon,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: Container(
        height: 48, // Ergonomic touch target >= 48px
        padding: const EdgeInsets.symmetric(horizontal: 20),
        decoration: BoxDecoration(
          color: isSaffron ? SdsLightTheme.saffronAccent : SdsLightTheme.navyPrimary,
          borderRadius: SdsLightTheme.radiusLg,
          boxShadow: [
            BoxShadow(
              color: (isSaffron ? SdsLightTheme.saffronAccent : SdsLightTheme.navyPrimary).withOpacity(0.25),
              blurRadius: 8,
              offset: const Offset(0, 3),
            ),
          ],
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (icon != null) ...[
              Icon(icon, color: isSaffron ? Colors.black : Colors.white, size: 18),
              const SizedBox(width: 8),
            ],
            Text(
              label,
              style: TextStyle(
                color: isSaffron ? Colors.black : Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: 13,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
