module hero_compact_object_kernel
  implicit none
contains
  real(8) function wave_sin(angle)
    real(8), intent(in) :: angle
    real(8) :: wrapped, shaped
    real(8), parameter :: pi_value = 3.14159265358979323846d0

    wrapped = mod(angle, 2.0d0 * pi_value)
    if (wrapped > pi_value) wrapped = wrapped - 2.0d0 * pi_value
    if (wrapped < -pi_value) wrapped = wrapped + 2.0d0 * pi_value

    shaped = (4.0d0 / pi_value) * wrapped
    shaped = shaped - (4.0d0 / (pi_value * pi_value)) * wrapped * abs(wrapped)
    wave_sin = 0.225d0 * (shaped * abs(shaped) - shaped) + shaped
  end function wave_sin

  real(8) function wave_cos(angle)
    real(8), intent(in) :: angle
    real(8), parameter :: pi_value = 3.14159265358979323846d0

    wave_cos = wave_sin(angle + 0.5d0 * pi_value)
  end function wave_cos

  real(8) function seeded_unit(index_value, seed_value)
    integer, intent(in) :: index_value, seed_value
    integer(8) :: mixed

    mixed = mod(1103515245_8 * int(index_value + 31 * seed_value, kind=8) + &
      12345_8, 2147483647_8)
    if (mixed < 0_8) mixed = mixed + 2147483647_8
    seeded_unit = real(mixed, kind=8) / 2147483647.0d0
  end function seeded_unit

  real(8) function seed_phase(seed_value)
    integer, intent(in) :: seed_value
    real(8), parameter :: tau_value = 6.28318530717958647692d0

    seed_phase = tau_value * seeded_unit(19, seed_value)
  end function seed_phase

  real(8) function hero_precession(time_value, seed_value)
    real(8), intent(in) :: time_value
    integer, intent(in) :: seed_value
    real(8) :: phase

    phase = seed_phase(seed_value)
    hero_precession = 0.17d0 * wave_sin(0.021d0 * time_value + phase)
    hero_precession = hero_precession + &
      0.08d0 * wave_sin(0.0067d0 * time_value - 0.61d0 * phase)
  end function hero_precession

  real(8) function hero_tilt(time_value, seed_value)
    real(8), intent(in) :: time_value
    integer, intent(in) :: seed_value
    real(8) :: phase

    phase = seed_phase(seed_value)
    hero_tilt = 0.58d0 + 0.055d0 * wave_sin(0.011d0 * time_value + phase)
    hero_tilt = hero_tilt + &
      0.025d0 * wave_sin(0.0043d0 * time_value - 0.37d0 * phase)
  end function hero_tilt

  real(8) function hero_density(time_value, seed_value)
    real(8), intent(in) :: time_value
    integer, intent(in) :: seed_value
    real(8) :: phase

    phase = seed_phase(seed_value)
    hero_density = 0.72d0 + &
      0.10d0 * wave_sin(0.037d0 * time_value + 0.71d0 * phase)
    hero_density = hero_density + &
      0.055d0 * wave_sin(0.013d0 * time_value - 0.42d0 * phase)
  end function hero_density

  real(8) function hero_flare(time_value, seed_value)
    real(8), intent(in) :: time_value
    integer, intent(in) :: seed_value
    real(8) :: phase, pulse

    phase = seed_phase(seed_value)
    pulse = wave_sin(0.071d0 * time_value + phase)
    pulse = pulse + 0.42d0 * wave_sin(0.019d0 * time_value - 0.53d0 * phase)
    pulse = max(0.0d0, pulse - 0.66d0)
    hero_flare = min(1.0d0, pulse * pulse * 1.18d0)
  end function hero_flare

  real(8) function hero_lens_strength(time_value, seed_value)
    real(8), intent(in) :: time_value
    integer, intent(in) :: seed_value
    real(8) :: phase

    phase = seed_phase(seed_value)
    hero_lens_strength = 0.92d0 + &
      0.045d0 * wave_sin(0.017d0 * time_value + 0.31d0 * phase)
    hero_lens_strength = hero_lens_strength + &
      0.018d0 * wave_sin(0.0051d0 * time_value - phase)
  end function hero_lens_strength

  real(8) function hero_turbulence(time_value, seed_value)
    real(8), intent(in) :: time_value
    integer, intent(in) :: seed_value
    real(8) :: phase

    phase = seed_phase(seed_value)
    hero_turbulence = 0.55d0 + &
      0.16d0 * wave_sin(0.029d0 * time_value + 0.83d0 * phase)
    hero_turbulence = hero_turbulence + &
      0.07d0 * wave_sin(0.0089d0 * time_value - 0.28d0 * phase)
  end function hero_turbulence

  real(8) function hero_camera_x(time_value, seed_value)
    real(8), intent(in) :: time_value
    integer, intent(in) :: seed_value
    real(8) :: phase

    phase = seed_phase(seed_value)
    hero_camera_x = 0.035d0 * wave_sin(0.0083d0 * time_value + phase)
    hero_camera_x = hero_camera_x + &
      0.012d0 * wave_sin(0.0029d0 * time_value - 0.44d0 * phase)
  end function hero_camera_x

  real(8) function hero_camera_y(time_value, seed_value)
    real(8), intent(in) :: time_value
    integer, intent(in) :: seed_value
    real(8) :: phase

    phase = seed_phase(seed_value)
    hero_camera_y = 0.026d0 * wave_cos(0.0071d0 * time_value + 0.52d0 * phase)
    hero_camera_y = hero_camera_y + &
      0.009d0 * wave_sin(0.0023d0 * time_value - phase)
  end function hero_camera_y

  real(8) function hero_temperature(time_value, seed_value)
    real(8), intent(in) :: time_value
    integer, intent(in) :: seed_value
    real(8) :: phase

    phase = seed_phase(seed_value)
    hero_temperature = 0.58d0 + &
      0.10d0 * wave_sin(0.0077d0 * time_value + 0.27d0 * phase)
    hero_temperature = hero_temperature + &
      0.045d0 * wave_sin(0.031d0 * time_value - 0.68d0 * phase)
  end function hero_temperature

  real(8) function hero_state_checksum(seed_value)
    integer, intent(in) :: seed_value
    real(8) :: sample_time

    sample_time = 137.0d0
    hero_state_checksum = hero_precession(sample_time, seed_value)
    hero_state_checksum = hero_state_checksum + &
      2.0d0 * hero_tilt(sample_time, seed_value)
    hero_state_checksum = hero_state_checksum + &
      3.0d0 * hero_density(sample_time, seed_value)
    hero_state_checksum = hero_state_checksum + &
      5.0d0 * hero_flare(sample_time, seed_value)
    hero_state_checksum = hero_state_checksum + &
      7.0d0 * hero_lens_strength(sample_time, seed_value)
    hero_state_checksum = hero_state_checksum + &
      11.0d0 * hero_turbulence(sample_time, seed_value)
    hero_state_checksum = hero_state_checksum + &
      13.0d0 * hero_camera_x(sample_time, seed_value)
    hero_state_checksum = hero_state_checksum + &
      17.0d0 * hero_camera_y(sample_time, seed_value)
    hero_state_checksum = hero_state_checksum + &
      19.0d0 * hero_temperature(sample_time, seed_value)
  end function hero_state_checksum

  integer function hero_signature()
    hero_signature = 20260724
  end function hero_signature
end module hero_compact_object_kernel

program hero_compact_object_entry
  use hero_compact_object_kernel
  implicit none
  real(8) :: guard_value

  guard_value = hero_state_checksum(1729)
  guard_value = guard_value + real(hero_signature(), kind=8)
  if (guard_value < -1.0d99) print *, guard_value
end program hero_compact_object_entry
